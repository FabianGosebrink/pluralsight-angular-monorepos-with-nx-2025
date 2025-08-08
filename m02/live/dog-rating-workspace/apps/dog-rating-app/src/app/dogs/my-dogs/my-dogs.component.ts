import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Dispatcher } from '@ngrx/signals/events';
import { MyDogsStore } from './my-dogs.store';
import { SingleDogComponent } from '../single-dog/single-dog.component';
import { Dog } from '../models/dog';
import { dogUserEvents } from '../store/dog-remove.feature';

@Component({
  selector: 'app-my-dogs',
  imports: [RouterLink, SingleDogComponent],
  providers: [MyDogsStore],
  templateUrl: './my-dogs.component.html',
  styleUrl: './my-dogs.component.scss',
})
export class MyDogsComponent {
  store = inject(MyDogsStore);
  readonly #dispatcher = inject(Dispatcher);

  deleteDog(dog: Dog): void {
    this.#dispatcher.dispatch(dogUserEvents.deleteDog(dog));
  }
}
