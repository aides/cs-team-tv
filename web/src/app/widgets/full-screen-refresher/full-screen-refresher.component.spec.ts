import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreenRefresherComponent } from './full-screen-refresher.component';

describe('FullScreenRefresherComponent', () => {
  let component: FullScreenRefresherComponent;
  let fixture: ComponentFixture<FullScreenRefresherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullScreenRefresherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullScreenRefresherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
