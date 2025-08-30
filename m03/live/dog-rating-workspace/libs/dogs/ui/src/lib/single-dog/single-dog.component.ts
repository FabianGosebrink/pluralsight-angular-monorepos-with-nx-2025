import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Dog } from '@dog-rate-app/dogs/domain';

@Component({
  selector: 'lib-single-dog',
  imports: [RouterLink, DecimalPipe, DatePipe],
  templateUrl: './single-dog.component.html',
  styleUrls: ['./single-dog.component.scss'],
})
export class SingleDogComponent {
  dog = input<Dog | null>();

  dogDeleted = output<Dog>();
}
