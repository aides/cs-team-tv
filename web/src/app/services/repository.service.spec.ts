import { TestBed, inject } from '@angular/core/testing';

import { RepositoryService } from './repository.service';

describe('GithubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepositoryService]
    });
  });

  it('should be created', inject([RepositoryService], (service: RepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
