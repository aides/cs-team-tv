import { Injectable, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from './config.service';

@Injectable()
export class BuildService {
  constructor(private http: Http, private configService: ConfigService) { }

  private config = null;

  private getRepositoryName(id: number): string {
    switch (id) {
      case 376:
        return 'clientsuccess-searchservice';
      case 377:
        return 'clientsuccess-ops';
      case 378:
        return 'clientsuccess';
      default:
        return 'UNKNOWN';
    }
  }

  private getBuildDetails(projectId: string) {
    const headers = new Headers();
    headers.set('Private-Token', `${this.config.token}`);

    const uri = `${this.config.url}/api/v4/projects/${projectId}/pipelines`;
    const top10uri = uri + '?per_page=10';

    return this.http.get(top10uri, { headers })
      .flatMap((builds) => {
        const obsArray =
          builds.json().map((pr) =>
            this.http.get(uri + `/${pr.id}`, { headers }));

        if (!obsArray.length) {
          return Observable.of([]);
        }

        return Observable.forkJoin(...obsArray);
      });
  }

  getBuilds(): Observable<any> {
    return Observable.interval(60000).startWith(0).switchMap((index) => {
      return this.configService.getRepositoryConfig()
        .flatMap((config) => {
          this.config = config;
          const buildsByRepo = this.config.repos.map((r) => this.getBuildDetails(r));
          return Observable.forkJoin(...buildsByRepo);
        })
        .map((data: Array<Array<any>>) => {
          let result: Array<any> = [];

          for (let i = 0; i < this.config.repos.length; i++) {
            const builds = data[i].map(d => {
              const b = d.json();
              return {
                repository: this.getRepositoryName(Number(this.config.repos[i])),
                branch: b.ref,
                user: b.user.name,
                status: b.status,
                running: !b.finished_at,
                startTime: b.udpated_at || b.created_at,
              };
            });

            result = result.concat(builds);
          }

          result.sort((a, b) => {
            const aDate = new Date(a.startTime);
            const bDate = new Date(b.startTime);

            if (bDate > aDate) {
              return 1;
            } else if (bDate < aDate) {
              return -1;
            }
             return 0;
          });
          return result;
        });
    });
  }
}
