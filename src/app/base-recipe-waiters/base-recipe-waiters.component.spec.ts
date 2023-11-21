import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseRecipeWaitersComponent } from './base-recipe-waiters.component';

describe('BaseRecipeWaitersComponent', () => {
  let component: BaseRecipeWaitersComponent;
  let fixture: ComponentFixture<BaseRecipeWaitersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseRecipeWaitersComponent]
    });
    fixture = TestBed.createComponent(BaseRecipeWaitersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
