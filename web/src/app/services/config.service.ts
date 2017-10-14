import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class ConfigService {

  private configUri = `${environment.proxyHost}/config`;

  private circleCIToken: string = null;
  private gitHubToken: string = null;
  private gitHubOrg: string = null;
  private gitHubRepos: string[] = null;

  constructor(private http: Http) { }

  private loadConfig(): Observable<Response> {
    return this.http.get(this.configUri).do((data) => {
      const res = data.json();

      this.circleCIToken = res.circleCIToken;
      this.gitHubToken = res.gitHubToken;
      this.gitHubOrg = res.gitHubOrg;
      this.gitHubRepos = res.gitHubRepos;
    });
  }

  getCircleCIToken(): Observable<string> {
    if (this.circleCIToken) {
      return Observable.of(this.circleCIToken);
    }

    return this.loadConfig().map(() => this.circleCIToken);
  }

  getGitHubConfig(): Observable<any> {
    if (this.gitHubToken) {
      return Observable.of({
        token: this.gitHubToken,
        org: this.gitHubOrg,
        repos: this.gitHubRepos,
      });
    }

    return this.loadConfig().map(() => {
      return {
        token: this.gitHubToken,
        org: this.gitHubOrg,
        repos: this.gitHubRepos,
      };
    });
  }
}
