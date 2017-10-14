import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from './config.service';

@Injectable()
export class BuildService {

  private getUrl(token: string): string {
    return `https://circleci.com/api/v1.1/recent-builds?circle-token=${token}&limit=10`;
  }

  constructor(private http: Http, private configService: ConfigService) { }

  getBuilds(): Observable<any> {
    return Observable.interval(15000).startWith(-1).switchMap((index) => {
      return this.configService.getCircleCIToken()
        .map(this.getUrl)
        .flatMap((url) => this.http.get(url))
        .map((data) => {
          return data.json().map((b) => {
            return {
              repository: b.reponame,
              failed: !!b.failed,
              branch: b.branch || b.vcs_tag,
              user: b.user.name,
              status: b.status,
              startTime: b.queued_at,
            };
          });
        });
    });
  }
}
