import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseRecipeComponent } from './base-recipe.component';

describe('BaseRecipeComponent', () => {
  let component: BaseRecipeComponent;
  let fixture: ComponentFixture<BaseRecipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseRecipeComponent]
    });
    fixture = TestBed.createComponent(BaseRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
