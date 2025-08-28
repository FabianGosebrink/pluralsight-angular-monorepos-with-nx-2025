import { DatePipe, DecimalPipe, NgOptimizedImage } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Dog, dogUserEvents } from '@dog-rate-app/dogs/domain';
import { Dispatcher } from '@ngrx/signals/events';
import { DogDetailsStore } from './dog-detail.store';

@Component({
  selector: 'lib-dog-detail',
  imports: [RouterLink, NgOptimizedImage, DatePipe, DecimalPipe],
  providers: [DogDetailsStore],
  templateUrl: './dog-detail.component.html',
  styleUrl: './dog-detail.component.scss',
})
export class DogDetailComponent implements OnInit {
  dogId = input('');

  store = inject(DogDetailsStore);
  readonly #dispatcher = inject(Dispatcher);

  ngOnInit(): void {
    this.store.loadSingleDogIfNotLoaded(this.dogId);
  }

  deleteDog(dog: Dog): void {
    this.#dispatcher.dispatch(dogUserEvents.deleteDog(dog));
  }
}
