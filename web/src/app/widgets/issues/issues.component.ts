import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'cs-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  issues: any[];

  getClassDefinition(tenant) {
    return {
      'table-danger': tenant.status === 'Reopened',
      'table-info': tenant.status === 'Open',
      'table-warning': tenant.status === 'Code Review',
      'table-success': tenant.status === 'In Development' || tenant.status === 'Staged',
    };
  }

  constructor(private issueService: IssueService) { }

  ngOnInit() {
    this.issueService.getIssues().subscribe((issues) => {
      this.issues = issues;
    });
  }
}
