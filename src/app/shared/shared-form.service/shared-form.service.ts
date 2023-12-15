import { Injectable } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SharedFormService {
  currentOrderIndex = 1;

  constructor(private fb: FormBuilder) {}

  addImageToForm(imageUrl: string, formArray: FormArray) {
    formArray.push(
      this.fb.group({
        image_recipe: imageUrl,
      })
    );
  }

  removeImage(index: number, formArray: FormArray) {
    formArray.removeAt(index);
  }

  addVideo(formArray: FormArray) {
    formArray.push(
      this.fb.group({
        video_recipe: '',
      })
    );
  }

}


