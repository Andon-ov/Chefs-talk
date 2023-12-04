import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from 'src/app/shared/comments.services/comment.service';
import { Comments } from 'src/app/shared/interfaces/interfaces';
import { Firestore, updateDoc, doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-comment-form-edit',
  templateUrl: './comment-form-edit.component.html',
  styleUrls: ['./comment-form-edit.component.css'],
})
export class CommentFormEditComponent implements OnInit {
  comment: Comments | null = null;
  commentId = '';
  commentFormEdit!: FormGroup;
  firestore: Firestore;
  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private fb: FormBuilder,
    private router: Router,
    firestore: Firestore
  ) {
    this.firestore = firestore;
  }
  async ngOnInit() {
    this.initializeForm();
    await this.loadData();
  }

  private async loadData() {
    this.route.paramMap.subscribe(async (params) => {
      const commentId = params.get('id');

      this.commentId = commentId!;

      if (commentId) {
        try {
          this.comment = await this.commentService.getCommentById(commentId);

          this.patchFormWithCommentData();
        } catch (error) {
          console.error(
            'An error occurred while retrieving the comment:',
            error
          );
          throw error;
        }
      } else {
        console.error('Comment ID not provided.');
      }
    });
  }

  private initializeForm() {
    this.commentFormEdit = this.fb.group({
      name: [''],
      text: ['', Validators.required],
      recipeId: [''],
      create_time: [''],
      uid: [''],
    });
  }

  patchFormWithCommentData() {
    this.commentFormEdit.patchValue({
      name: this.comment?.name,
      text: this.comment?.text,
      recipeId: this.comment?.recipeId,
      create_time: this.comment?.create_time,
      uid: this.comment?.uid,
      id: this.comment?.id,
    });
  }

  onSubmit() {
    if (this.commentFormEdit.valid) {
      const commentData = this.commentFormEdit.value;

      this.editComment(commentData);
      this.commentFormEdit.reset();
    } else {
      console.log('form invalid');
    }
  }

  editComment(commentData: any) {
    const collectionName = 'Comments';

    const docRef = doc(this.firestore, collectionName, this.commentId);
    updateDoc(docRef, commentData);
    this.router.navigate(['/recipe', this.comment?.recipeId]);
  }
}
