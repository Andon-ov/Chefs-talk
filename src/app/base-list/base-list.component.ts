import {Component, OnInit} from '@angular/core';
import {BaseRecipe} from '../shared/interfaces/interfaces';
import {BaseRecipeService} from '../shared/base-recipe.services/base-recipe.service';

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.css'],
})
export class BaseListComponent implements OnInit {
  baseRecipes: BaseRecipe[] = [];

  constructor(private baseRecipeService: BaseRecipeService) {
  }

  ngOnInit(): void {
    this.getBaseRecipes();
  }

  getBaseRecipes() {
    this.baseRecipeService.getBaseRecipe().subscribe({
      next: (data) => {
        this.baseRecipes = data.sort((a, b) => a.title.localeCompare(b.title));
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }
}
