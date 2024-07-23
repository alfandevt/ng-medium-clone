import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserProfileInterface } from '../types/userProfile.interface';
import { environment } from '../../../environments/environment.development';
import { GetUserProfileResponseInterface } from '../types/getUserProfileReponse.interface';

@Injectable()
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(slug: string): Observable<UserProfileInterface> {
    const url = environment.apiURL + '/profiles/' + slug;
    return this.http
      .get<GetUserProfileResponseInterface>(url)
      .pipe(map((response) => response.profile));
  }
}
