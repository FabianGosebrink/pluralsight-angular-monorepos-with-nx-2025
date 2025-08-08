import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, filter, pipe, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { DogsStore } from '../store/dogs.store';
import { WebNotificationService } from '@dog-rate-app/shared/util-notification';
import { DogsApiService } from '../services/dogs-api.service';

export const DogDetailsStore = signalStore(
  withState({
    dogId: null as string | null,
  }),
  withComputed((store, dogsStore = inject(DogsStore)) => ({
    detailDog: computed(() => {
      const dogId = store.dogId();
      const entityMap = dogsStore.entityMap();

      return dogId ? entityMap[dogId] : null;
    }),
  })),
  withMethods(
    (
      store,
      dogsStore = inject(DogsStore),
      notificationService = inject(WebNotificationService),
      dogsApiService = inject(DogsApiService)
    ) => ({
      loadSingleDogIfNotLoaded: rxMethod<string>(
        pipe(
          tap((id) => patchState(store, { dogId: id })),
          filter((id) => !dogsStore.entityMap()[id]),
          exhaustMap((id) =>
            dogsApiService.getSingleDog(id).pipe(
              tapResponse({
                next: (dog) => dogsStore.addDog(dog),
                error: () => notificationService.showError(),
              })
            )
          )
        )
      ),
    })
  )
);
