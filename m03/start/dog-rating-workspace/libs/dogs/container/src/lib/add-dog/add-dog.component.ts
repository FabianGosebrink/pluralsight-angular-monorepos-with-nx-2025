import { Component, inject } from '@angular/core';
import { DogFormComponent } from '@dog-rate-app/dogs/ui';
import { AddDogStore } from './add-dog.store';

@Component({
  selector: 'lib-add-dog',
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
