import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'cs-pull-requests',
  templateUrl: './pull-requests.component.html',
  styleUrls: ['./pull-requests.component.css']
})
export class PullRequestsComponent implements OnInit {
  prs: any;

  getClassDefinition(pr) {
    return {
      'table-danger': pr.state !== 'unstable' && pr.state !== 'clean',
      'table-warning': pr.state === 'unstable',
      'table-success': pr.state === 'clean'
    };
  }

  constructor(private githubService: GithubService) { }

  ngOnInit() {
    this.githubService.getPullRequests()
      .subscribe((prs) => {
        this.prs = prs;
      });
  }
}
