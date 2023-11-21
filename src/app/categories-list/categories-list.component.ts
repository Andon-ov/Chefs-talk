import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/interfaces/interfaces';
import { CategoriesService } from '../shared/categories.services/categories.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data
          .sort((a, b) => a.order_index - b.order_index)
          .filter((a) => a.is_active);
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }
}
