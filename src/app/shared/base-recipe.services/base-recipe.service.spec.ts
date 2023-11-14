import { TestBed } from '@angular/core/testing';

import { BaseRecipeService } from './base-recipe.service';

describe('BaseRecipeService', () => {
  let service: BaseRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
