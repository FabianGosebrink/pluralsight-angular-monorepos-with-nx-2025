import { inject } from '@angular/core';
import { signalStoreFeature, type } from '@ngrx/signals';
import { Dog } from '../models/dog';
import { exhaustMap } from 'rxjs';
import { mapResponse } from '@ngrx/operators';
import { DogsApiService } from '../services/dogs-api.service';
import { Router } from '@angular/router';
import {
  eventGroup,
  Events,
  on,
  withEffects,
  withReducer,
} from '@ngrx/signals/events';
import { removeEntity } from '@ngrx/signals/entities';
import { WebNotificationService } from '@dog-rate-app/shared/util-notification';

export const dogUserEvents = eventGroup({
  source: 'Dogs User',
  events: {
    deleteDog: type<Dog>(),
  },
});

export const dogAPIEvents = eventGroup({
  source: 'Dogs API',
  events: {
    deleteDogSuccess: type<Dog>(),
  },
});

export function withDogRemove() {
  return signalStoreFeature(
    withReducer(
      on(dogAPIEvents.deleteDogSuccess, ({ payload }) =>
        removeEntity(payload.id)
      )
    ),
    withEffects(
      (
        _,
        events = inject(Events),
        dogsApiService = inject(DogsApiService),
        router = inject(Router),
        notificationService = inject(WebNotificationService)
      ) => ({
        deleteDog: events.on(dogUserEvents.deleteDog).pipe(
          exhaustMap(({ payload }) =>
            dogsApiService.deleteDog(payload).pipe(
              mapResponse({
                next: () => {
                  router.navigate(['/dogs/my']);

                  return dogAPIEvents.deleteDogSuccess(payload);
                },
                error: () => notificationService.showError(),
              })
            )
          )
        ),
      })
    )
  );
}
