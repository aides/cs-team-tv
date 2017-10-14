import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class TenantService {

  private tenantsUri = `${environment.proxyHost}/tenants`;

  constructor(private http: Http) { }

  getTenants(): Observable<any> {
    return Observable.interval(60000).startWith(-1).switchMap((index) => {
      return this.http.get(this.tenantsUri)
        .timeout(60000)
        .map((data) => {
          return data.json().map((t) => {
            return {
              tenantName: t.tenantName,
              upgradeChannel: t.upgradeChannel,
              deploymentRegion: t.deploymentRegion,
              deploymentStatus: t.deploymentStatus
            };
          });
        });
    });
  }

  getTenantStatus(tenantId: string): Observable<any> {
    return this.http.get(this.tenantsUri + `/${tenantId}/status`)
      .catch((err) => {
        return Observable.of(null);
      })
      .map((data: any) => {
        const res = data.json();
        return {
          tenantId: tenantId,
          status: res ? res.status : 'UNKNOWN',
        };
      });
  }
}
