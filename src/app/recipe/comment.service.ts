import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from '@angular/fire/firestore';
import { Comments } from '../interfaces';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private commentAddedSubject = new Subject<void>();

  constructor(private firestore: Firestore) {}

  async getCommentsForRecipe(recipeId: string): Promise<Comments[]> {
    try {
      const commentsRecipesRef = collection(this.firestore, 'Comments');
      const q = query(commentsRecipesRef, where('recipeId', '==', recipeId));
      const querySnapshot = await getDocs(q);

      const comments: Comments[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const comment: any = {
          create_time: data['create_time'],
          name: data['name'],
          recipeId: data['recipeId'],
          text: data['text'],
        };
        comments.push(comment);
      });
      comments.sort((a, b) => {
        const dateA: any = a.create_time.toDate();
        const dateB: any = b.create_time.toDate();

        return dateB - dateA;
      });

      return comments;
    } catch (error) {
      console.error('Error retrieving comments:', error);
      return [];
    }
  }

  async addComment(commentData: Comments): Promise<string | null> {
    try {
      if (!commentData.name) {
        commentData.name = 'Анонимен';
      }

      const collectionName = 'Comments';
      const docRef = await addDoc(
        collection(this.firestore, collectionName),
        commentData
      );
      this.commentAddedSubject.next();
      return docRef.id;
    } catch (error) {
      console.error('Error adding comment:', error);
      return null;
    }
  }
  getCommentAddedObservable() {
    return this.commentAddedSubject.asObservable();
  }
}
