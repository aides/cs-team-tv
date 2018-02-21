import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { BuildStatusComponent } from './widgets/build-status/build-status.component';
import { BuildService } from './services/build-service.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { TenantsComponent } from './widgets/tenants/tenants.component';
import { TenantService } from './services/tenant.service';
import { IssuesComponent } from './widgets/issues/issues.component';
import { IssueService } from './services/issue.service';
import { PullRequestsComponent } from './widgets/pull-requests/pull-requests.component';
import { RepositoryService } from './services/repository.service';
import { InitialsPipe } from './shared/initials.pipe';
import { ShortenerPipe } from './shared/shortener.pipe';
import { HeaderComponent } from './widgets/header/header.component';
import { ConfigService } from './services/config.service';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/timer';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import { FullScreenRefresherComponent } from './widgets/full-screen-refresher/full-screen-refresher.component';

@NgModule({
  declarations: [
    AppComponent,
    BuildStatusComponent,
    TenantsComponent,
    IssuesComponent,
    PullRequestsComponent,
    InitialsPipe,
    ShortenerPipe,
    HeaderComponent,
    FullScreenRefresherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([])
  ],
  providers: [
    ConfigService,
    BuildService,
    TenantService,
    IssueService,
    RepositoryService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
