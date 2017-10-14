import { Component, OnInit } from '@angular/core';
import { TenantService } from '../../services/tenant.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'cs-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css']
})
export class TenantsComponent implements OnInit {

  tenants: any[];
  tenantStatus: any = {};

  constructor(private tenantService: TenantService) {

  }

  getClassDefinition(status) {
    return {
      'table-danger': status === 'ERROR',
      'table-warning': status === 'UNKNOWN',
      'table-success': status === 'OK'
    };
  }

  ngOnInit() {
    this.tenantService.getTenants()
      .concatMap((tenants) => {
        this.tenants = tenants;
        return Observable.from(tenants.map((t) => t.tenantName))
          .flatMap((tName: string) => {
            return this.tenantService.getTenantStatus(tName);
          });
      })
      .subscribe((ts: any) => {
        this.tenantStatus[ts.tenantId] = ts.status;
      });
  }
}
