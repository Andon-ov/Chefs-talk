import { Component, OnInit, Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import { CommentService } from 'src/app/recipe/comment.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent implements OnInit {
  commentForm!: FormGroup;
  firestore: Firestore;
  timestamp = new Date();
  @Input() recipeId!: string | null;

  constructor(
    private fb: FormBuilder,
    firestore: Firestore,
    private commentService: CommentService
  ) {
    this.firestore = firestore;
  }

  ngOnInit() {
    this.commentForm = this.fb.group({
      name: ['', Validators.required],
      recipeId: [this.recipeId], // Hidden field
      text: ['', Validators.required],
      create_time: this.timestamp,
    });
  }

  // onSubmit() {
  //   if (this.commentForm.valid) {
  //     this.commentService.addComment(this.commentForm.value);
  //     this.commentForm.reset();
  //   }
  // }
  async onSubmit() {
    if (this.commentForm.valid) {
      try {
        const result = await this.commentService.addComment(
          this.commentForm.value
        );
        if (result) {
          console.log('Comment successfully added.');
          this.commentForm.reset();
          // Here i can add logic to refill the recipe
        } else {
          console.error('Error adding comment.');
        }
      } catch (error) {
        console.error('An error occurred while submitting the comment:', error);
      }
    }
  }
}
