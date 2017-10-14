import { Injectable, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from './config.service';

@Injectable()
export class GithubService {

  constructor(private http: Http, private configService: ConfigService) { }

  private config = null;

  private getPRsWithDetailsByRepository(repositoryName: string) {
    const headers = new Headers();
    headers.set('Authorization', `Basic ${this.config.token}`);

    const uri = `https://api.github.com/repos/${this.config.org}/${repositoryName}/pulls`;

    return this.http.get(uri, { headers })
      .flatMap((pulls) => {
        const obsArray =
          pulls.json().map((pr) =>
            this.http.get(uri + `/${pr.number}`, { headers }));

        if (!obsArray.length) {
          return Observable.of([]);
        }

        return Observable.forkJoin(...obsArray);
      });
  }

  getPullRequests(): Observable<any> {
    return Observable.interval(60000).startWith(0).switchMap((index) => {
      return this.configService.getGitHubConfig()
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

          return result.map((r) => {
            const pr = r.json();
            return {
              number: pr.number,
              name: pr.title,
              repository: pr.head.repo.name,
              state: pr.mergeable_state,
              createdAt: pr.created_at,
            };
          });
        });
    });
  }
}
