import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Token } from '../model/token.class';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  /* Your clientID */
  private clientID: number = 99999;
  private clientSecret: string = 'MY_CLIENT_SECRET';

  private readRefreshToken: string = 'MY_REFRESH_RD_TOKEN';
  private writeRefreshToken: string = 'MY_REFRESH_WR_TOKEN';

  readUrl: string = `https://www.strava.com/oauth/token?client_id=${this.clientID}&client_secret=${this.clientSecret}&refresh_token=${this.readRefreshToken}&grant_type=refresh_token`;
  postUrl: string = `https://www.strava.com/oauth/token?client_id=${this.clientID}&client_secret=${this.clientSecret}&refresh_token=${this.writeRefreshToken}&grant_type=refresh_token`;

  constructor(public http: HttpClient) {}

  getReadToken() {
    return this.http.post<Token>(this.readUrl, '');
  }

  getWriteToken() {
    return this.http.post<Token>(this.postUrl, '');
  }
}
