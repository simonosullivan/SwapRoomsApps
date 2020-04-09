import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailOfferComponent } from './view-detail-offer.component';

describe('ViewDetailOfferComponent', () => {
  let component: ViewDetailOfferComponent;
  let fixture: ComponentFixture<ViewDetailOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
