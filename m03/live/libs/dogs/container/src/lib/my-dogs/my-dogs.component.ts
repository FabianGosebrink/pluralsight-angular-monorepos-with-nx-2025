import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Dog, dogUserEvents } from '@dog-rate-app/dogs/domain';
import { SingleDogComponent } from '@dog-rate-app/dogs/ui';
import { Dispatcher } from '@ngrx/signals/events';
import { MyDogsStore } from './my-dogs.store';

@Component({
  selector: 'lib-my-dogs',
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
