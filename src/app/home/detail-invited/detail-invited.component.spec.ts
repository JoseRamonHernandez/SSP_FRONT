import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInvitedComponent } from './detail-invited.component';

describe('DetailInvitedComponent', () => {
  let component: DetailInvitedComponent;
  let fixture: ComponentFixture<DetailInvitedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailInvitedComponent]
    });
    fixture = TestBed.createComponent(DetailInvitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
