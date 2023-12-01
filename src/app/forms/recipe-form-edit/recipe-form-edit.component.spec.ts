import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeFormEditComponent } from './recipe-form-edit.component';

describe('RecipeFormEditComponent', () => {
  let component: RecipeFormEditComponent;
  let fixture: ComponentFixture<RecipeFormEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeFormEditComponent]
    });
    fixture = TestBed.createComponent(RecipeFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
