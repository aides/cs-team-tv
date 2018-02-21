import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../services/repository.service';

@Component({
  selector: 'cs-pull-requests',
  templateUrl: './pull-requests.component.html',
  styleUrls: ['./pull-requests.component.css']
})
export class PullRequestsComponent implements OnInit {
  prs: any;

  getClassDefinition(pr) {
    return {
      'table-danger': pr.state !== 'unchecked' && pr.state !== 'can_be_merged',
      'table-warning': pr.state === 'unchecked',
      'table-success': pr.state === 'can_be_merged'
    };
  }

  constructor(private repoService: RepositoryService) { }

  ngOnInit() {
    this.repoService.getPullRequests()
      .subscribe((prs) => {
        this.prs = prs;
      });
  }
}
