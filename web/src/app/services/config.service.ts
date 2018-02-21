import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class ConfigService {

  private configUri = `${environment.proxyHost}/config`;

  private repositoryToken: string = null;
  private repositoryUrl: string = null;
  private repositoryIds: string[] = null;

  constructor(private http: Http) { }

  private loadConfig(): Observable<Response> {
    return this.http.get(this.configUri).do((data) => {
      const res = data.json();

      this.repositoryToken = res.repositoryToken;
      this.repositoryUrl = res.repositoryUrl;
      this.repositoryIds = res.repositoryIds;
    });
  }

  getRepositoryConfig(): Observable<any> {
    if (this.repositoryToken) {
      return Observable.of({
        url: this.repositoryUrl,
        token: this.repositoryToken,
        repos: this.repositoryIds,
      });
    }

    return this.loadConfig().map(() => {
      return {
        url: this.repositoryUrl,
        token: this.repositoryToken,
        repos: this.repositoryIds,
      };
    });
  }
}
