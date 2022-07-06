import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Profilo } from '../model/profilo.class';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(protected http: HttpClient) {}

  getReadToken(acessToken: string | undefined) {
    let readUrl = `https://www.strava.com/api/v3/athlete?access_token=${acessToken}`;
    
    return this.http.get<Profilo>(readUrl);
  }
}
