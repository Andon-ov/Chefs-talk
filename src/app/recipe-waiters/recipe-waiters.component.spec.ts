import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeWaitersComponent } from './recipe-waiters.component';

describe('RecipeWaitersComponent', () => {
  let component: RecipeWaitersComponent;
  let fixture: ComponentFixture<RecipeWaitersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeWaitersComponent]
    });
    fixture = TestBed.createComponent(RecipeWaitersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
