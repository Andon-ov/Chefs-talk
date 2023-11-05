import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBaseComponent } from './list-base.component';

describe('ListBaseComponent', () => {
  let component: ListBaseComponent;
  let fixture: ComponentFixture<ListBaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBaseComponent]
    });
    fixture = TestBed.createComponent(ListBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
