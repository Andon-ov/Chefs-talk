import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFormEditComponent } from './base-form-edit.component';

describe('BaseFormEditComponent', () => {
  let component: BaseFormEditComponent;
  let fixture: ComponentFixture<BaseFormEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseFormEditComponent]
    });
    fixture = TestBed.createComponent(BaseFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
