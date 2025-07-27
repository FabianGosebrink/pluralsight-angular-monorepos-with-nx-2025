import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private readonly http = inject(HttpClient);

  upload(formData: FormData): Observable<{ path: string }> {
    return this.http.post<{ path: string }>(
      `${environment.server}api/upload/image`,
      formData
    );
  }
}
