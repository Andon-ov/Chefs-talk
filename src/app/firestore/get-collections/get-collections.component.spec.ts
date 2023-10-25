import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCollectionsComponent } from './get-collections.component';

describe('GetCollectionsComponent', () => {
  let component: GetCollectionsComponent;
  let fixture: ComponentFixture<GetCollectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetCollectionsComponent]
    });
    fixture = TestBed.createComponent(GetCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
