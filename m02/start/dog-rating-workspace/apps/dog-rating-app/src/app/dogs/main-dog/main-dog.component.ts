import { Component, inject, input, OnInit } from '@angular/core';
import { MainDogStore } from './main-dog.store';
import { DogListComponent } from '../dog-list/dog-list.component';
import { DogRateComponent } from '../dog-rate/dog-rate.component';

@Component({
  selector: 'app-main-dog',
  imports: [DogListComponent, DogRateComponent],
  providers: [MainDogStore],
  templateUrl: './main-dog.component.html',
  styleUrl: './main-dog.component.scss',
})
export class MainDogComponent implements OnInit {
  dogId = input('');
  store = inject(MainDogStore);

  ngOnInit(): void {
    this.store.selectDog(this.dogId);
  }

  rateDog(rating: number): void {
    this.store.rateDog(rating);
  }

  skipDog(): void {
    this.store.selectNextDog();
  }

  selectDog(id: string): void {
    this.store.selectDog(id);
  }
}
