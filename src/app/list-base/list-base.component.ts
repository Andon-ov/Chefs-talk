import { Component, OnInit } from '@angular/core';
import { BaseRecipe } from '../interfaces';
import { BaseRecipeService } from '../base-recipe/base-recipe.service';

@Component({
  selector: 'app-list-base',
  templateUrl: './list-base.component.html',
  styleUrls: ['./list-base.component.css'],
})
export class ListBaseComponent implements OnInit {
  baseRecipes: BaseRecipe[] = [];
  constructor(private baseRecipeService: BaseRecipeService) {}
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
