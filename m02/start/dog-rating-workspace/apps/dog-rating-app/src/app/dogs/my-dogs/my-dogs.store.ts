import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { on, withReducer } from '@ngrx/signals/events';
import { DogsStore } from '../store/dogs.store';
import { dogAPIEvents } from '../store/dog-remove.feature';
import { WebNotificationService } from '../../notification/web-notification.service';
import { DogsApiService } from '../services/dogs-api.service';

export const MyDogsStore = signalStore(
  withState({ myDogsIds: [] as string[] }),
  withComputed(({ myDogsIds }, dogsStore = inject(DogsStore)) => ({
    myDogs: computed(() => {
      const entityMap = dogsStore.entityMap();

      return myDogsIds()
        .map((id) => entityMap[id])
        .filter(Boolean);
    }),
  })),
  withReducer(
    on(dogAPIEvents.deleteDogSuccess, ({ payload }) => (state) => ({
      myDogsIds: state.myDogsIds.filter((id) => id !== payload.id),
    }))
  ),
  withMethods(
    (
      store,
      notificationService = inject(WebNotificationService),
      dogsApiService = inject(DogsApiService)
    ) => ({
      loadMyDogs: rxMethod<void>(
        exhaustMap(() =>
          dogsApiService.getMyDogs().pipe(
            tapResponse({
              next: (myDogs) => {
                const myDogsIds = myDogs.map(({ id }) => id);
                patchState(store, { myDogsIds });
              },
              error: () => notificationService.showError(),
            })
          )
        )
      ),
    })
  ),
  withHooks({
    onInit(store) {
      store.loadMyDogs();
    },
  })
);
