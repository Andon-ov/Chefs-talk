import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent  implements OnInit {
  // @Input() recipeId: string; // Passing the recipe ID from the parent component

  commentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.commentForm = this.fb.group({
      name: ['', Validators.required],
      // recipeId: [this.recipeId], // Hidden field
      comment: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  submitComment() {
    //Here I can submit the form to the server or process the comment as needed
    console.log(this.commentForm.value);
  }
}

