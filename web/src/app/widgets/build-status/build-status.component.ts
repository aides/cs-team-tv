import { Component, OnInit, Inject, InjectionToken } from '@angular/core';
import { BuildService } from '../../services/build-service.service';

@Component({
  selector: 'cs-build-status',
  templateUrl: './build-status.component.html',
  styleUrls: ['./build-status.component.css']
})
export class BuildStatusComponent implements OnInit {

  builds: any[];

  constructor(private buildService: BuildService) { }

  getBranch(build) {
    return build.branch;
  }

  getClassDefinition(build) {
    return {
      'table-danger': build.status === 'failed',
      'table-info': build.status === 'pending',
      'table-success': build.status === 'success',
      'table-warning': build.status === 'running',
    };
  }

  ngOnInit() {
    this.buildService.getBuilds().subscribe((builds) => {
      this.builds = builds;
    });
  }
}
