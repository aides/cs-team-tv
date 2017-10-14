import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class IssueService {

  private jiraUri = `${environment.proxyHost}/issues`;

  constructor(private http: Http) { }

  getIssues(): Observable<any> {
    return Observable.interval(60000).startWith(-1).switchMap((index) => {
      return this.http.get(this.jiraUri)
        .timeout(60000)
        .map((data) => {
          return data.json().issues.map((i) => {
            return {
              key: i.key,
              summary: i.fields.summary,
              status: i.fields.status.name,
            };
          });
        });
    });
  }
}
