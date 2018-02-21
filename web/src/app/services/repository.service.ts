import { Injectable, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from './config.service';

@Injectable()
export class RepositoryService {

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

  private getPRsWithDetailsByRepository(repositoryName: string) {
    const headers = new Headers();
    headers.set('Private-Token', `${this.config.token}`);

    const uri = `${this.config.url}/api/v4/projects/${repositoryName}/merge_requests?state=opened`;

    return this.http.get(uri, { headers })
      .map((pulls) => {
        return pulls.json();
      });
  }

  getPullRequests(): Observable<any> {
    return Observable.interval(60000).startWith(0).switchMap((index) => {
      return this.configService.getRepositoryConfig()
        .flatMap((config) => {
          this.config = config;
          const prLoaders = this.config.repos.map((r) => this.getPRsWithDetailsByRepository(r));
          return Observable.forkJoin(...prLoaders);
        })
        .map((data: Array<Array<any>>) => {
          let result: Array<any> = [];

          data.forEach((d) => {
            result = result.concat(d);
          });

          result = result.map((pr) => {
            return {
              number: pr.id,
              name: pr.title,
              work_in_progress: pr.work_in_progress,
              repository: this.getRepositoryName(pr.project_id),
              state: pr.merge_status,
              createdAt: pr.created_at,
            };
          });

          result.sort((a, b) => {
            const aDate = new Date(a.createdAt);
            const bDate = new Date(b.createdAt);

            if (bDate > aDate) {
              return -1;
            } else if (bDate < aDate) {
              return 1;
            }
             return 0;
          });

          return result;
        });
    });
  }
}
