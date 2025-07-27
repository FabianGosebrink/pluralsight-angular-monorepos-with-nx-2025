import { animate, style, transition, trigger } from '@angular/animations';
import { DecimalPipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  input,
  Output,
} from '@angular/core';
import { timer } from 'rxjs';
import { Dog } from '../models/dog';

@Component({
  selector: 'lib-dog-rate',
  templateUrl: './dog-rate.component.html',
  styleUrls: ['./dog-rate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [
      transition('* => fadeIn', [animate(1000, style({ opacity: 1 }))]),
      transition('* => fadeOut', [animate(1200, style({ opacity: 0 }))]),
    ]),
  ],
  imports: [DecimalPipe, NgClass],
})
export class DogRateComponent {
  currentDog = input<Dog | null>(null);
  @Output() rated = new EventEmitter<number>();
  @Output() skipped = new EventEmitter();
  currentRating = 0;
  averageRating = computed(() => {
    this.currentRating = 0;

    return this.getAverageRating(this.currentDog());
  });
  status: 'fadeIn' | 'fadeOut' = 'fadeIn';

  rateDog(rating: number): void {
    this.currentRating = rating;
    this.status = 'fadeOut';

    timer(1000).subscribe(() => {
      this.rated.emit(rating);
    });
  }

  skipDog(): void {
    this.skipped.emit();
  }

  private getAverageRating(currentDog: Dog | null): number {
    if (!currentDog) {
      return 0;
    }

    const { ratingCount, ratingSum } = currentDog;

    return ratingSum / ratingCount;
  }
}
