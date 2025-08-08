import { Component, inject } from '@angular/core';
import { AddDogStore } from './add-dog.store';
import { DogFormComponent } from '../dog-form/dog-form.component';

@Component({
  selector: 'app-add-dog',
  imports: [DogFormComponent],
  providers: [AddDogStore],
  templateUrl: './add-dog.component.html',
  styleUrl: './add-dog.component.scss',
})
export class AddDogComponent {
  store = inject(AddDogStore);

  addDog({ name, comment, breed, formData }): void {
    this.store.addDogWithPicture({
      name,
      comment,
      breed,
      formData,
    });
  }
}
