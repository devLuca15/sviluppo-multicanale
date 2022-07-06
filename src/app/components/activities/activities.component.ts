import { Component, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';

import { Attivita } from 'src/app/model/attivita.class';

import { TokenService } from 'src/app/services/token.service';
import { AttivitaService } from 'src/app/services/attivita.service';

import {
  AddAttivita,
  AddClientSecret_read,
  AddClientSecret_write,
  AddPrestazioniProfilo,
} from 'src/app/store/store-action';
import { StoreSelector } from 'src/app/store/store-selector';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent implements OnInit {
  private readAcessToken: string;
  private writeAcessToken: string;

  public attivita: Attivita[] = [];

  public totAtt: number = 0;
  public totKm: number;

  public totTmp: number = 0;
  public totTmpString: string;

  constructor(
    protected store: Store,
    protected storeSelector: StoreSelector,
    protected tokenService: TokenService,
    protected attivitaService: AttivitaService
  ) {}

  ngOnInit() {
    this.aggiornamentoToken();

    setInterval(() => {
      this.aggiornamentoToken();
    }, 60000);

    this.storeSelector.attivita$.subscribe((data) => (this.attivita = data));

    console.log('Inserimento attività...');
  }

  aggiornamentoToken() {
    console.log('Chiamata aggiornamento dei Token...');

    // !! Aggiornamento Token lettura

    this.tokenService.getReadToken().subscribe((data) => {
      this.readAcessToken = data.access_token;

      console.log('Token LETTURA: ' + this.readAcessToken);

      // !! GET - Lista attività

      setTimeout(() => {
        this.attivitaService
          .getActivities(this.readAcessToken)
          .subscribe((data) => {
            this.attivita = data;

            console.log('Attività: ');
            console.log(this.attivita);

            // ** STORE - Aggiornamento Lista Attività
            this.store.dispatch(new AddAttivita(this.attivita));

            this.calcTot();
          });
      }, 0);

      // ** STORE - Aggiornamento ClientSecret_read
      this.store.dispatch(new AddClientSecret_read(this.readAcessToken));
    });

    // !! Aggiornamento Token scrittura

    this.tokenService.getWriteToken().subscribe((data) => {
      this.writeAcessToken = data.access_token;

      console.log('Token SCRITTURA: ' + this.writeAcessToken);

      // ** STORE - Aggiornamento ClientSecret_write
      this.store.dispatch(new AddClientSecret_write(this.writeAcessToken));
    });
  }

  calcTot() {
    for (let i = 0; i < this.attivita.length; i++) {
      this.totTmp = this.totTmp + this.attivita[i].moving_time;
    }

    // ** Calcolo tempo totale (int -> string)
    const tempoTotale = this.getMovingTime(this.totTmp);
    this.totTmpString = tempoTotale;

    // ** Calcolo numero attivita totali
    this.totAtt = this.attivita.length;

    // ** Calcolo Km totali
    this.totKm = 0;

    let currentProfile = {
      tempoTot: this.totTmpString,
      attivitaTot: this.totAtt,
      kmTot: this.totKm,
    };

    // ** STORE - Aggiornamento PrestazioniProfilo
    this.store.dispatch(new AddPrestazioniProfilo(currentProfile));
  }

  getMovingTime(sec: number) {
    let hours: number | string = Math.floor(sec / 3600);
    let minutes: number | string = Math.floor((sec - hours * 3600) / 60);
    let seconds: number | string = sec - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    return hours + ':' + minutes + ':' + seconds;
  }
}
