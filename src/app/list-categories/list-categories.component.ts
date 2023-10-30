import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Category } from '../interfaces';
import { CategoriesService } from './categories.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css'],
})
export class ListCategoriesComponent implements OnInit, OnChanges {
  categories: Category[] = [];

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.getCategory();
  }

  ngOnChanges(changes: SimpleChanges): void {}

  getCategory(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        console.log(this.categories);
        this.categories = data.sort((a, b) => a.order_index - b.order_index);
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      },
    });
  }
}
