import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Dog } from '../models/dog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DogsApiService {
  private readonly http = inject(HttpClient);

  getDogs(): Observable<Dog[]> {
    return this.http.get<Dog[]>(`${environment.server}api/dogs`);
  }

  getSingleDog(id: string): Observable<Dog> {
    return this.http.get<Dog>(`${environment.server}api/dogs/${id}`);
  }

  getMyDogs(): Observable<Dog[]> {
    return this.http.get<Dog[]>(`${environment.server}api/dogs/my`);
  }

  addDog(
    name: string,
    breed: string,
    comment: string,
    imageUrl: string
  ): Observable<Dog> {
    const toSend = { name, breed, comment, imageUrl };

    return this.http.post<Dog>(`${environment.server}api/dogs`, toSend);
  }

  deleteDog(dog: Dog): Observable<Dog> {
    return this.http
      .delete(`${environment.server}api/dogs/${dog.id}`)
      .pipe(map(() => dog));
  }

  rate(id: string, value: number): Observable<Dog> {
    return this.http.put<Dog>(`${environment.server}api/dogs/rate/${id}`, {
      value,
    });
  }
}
