import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Attivita } from '../model/attivita.class';

@Injectable({
  providedIn: 'root',
})
export class AttivitaService implements OnInit {
  private url: string;

  constructor(protected http: HttpClient) {}

  ngOnInit(): void {}

  getActivities(acessToken: string) {
    this.url = `https://www.strava.com/api/v3/athlete/activities?access_token=${acessToken}`;

    return this.http.get<Attivita[]>(this.url);
  }

  postActivity(acessToken: string, timer: number) {
    let currentDate = new Date();
    let title: string = 'Nuova attività';

    this.url = `https://www.strava.com/api/v3/activities?access_token=${acessToken}&name=${title}&type=Run&start_date_local=${currentDate}&elapsed_time=${timer}`;

    return this.http.post<Attivita[]>(this.url, '');
  }
}
