/// <reference types="web-bluetooth" />

import { Component, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';
import { AddAttivita } from './store/store-action';
import { StoreSelector } from './store/store-selector';

import { Attivita } from './model/attivita.class';
import { MessageService } from 'primeng/api';

import { TokenService } from './services/token.service';
import { AttivitaService } from './services/attivita.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public isConnected: boolean;

  public writeAcessToken: string;
  public readAcessToken: string;

  public attivita: Attivita[] = [];

  public bangleServer: any | undefined = undefined;
  public totalSeconds: number;

  constructor(
    protected store: Store,
    protected storeSelector: StoreSelector,
    public messageService: MessageService,
    protected tokenService: TokenService,
    protected attivitaService: AttivitaService
  ) {}

  ngOnInit(): void {
    this.isConnected = false;
  }

  openBlt() {
    console.log('connecting...');

    let mobileNavigatorObject: any = window.navigator;
    if (mobileNavigatorObject && mobileNavigatorObject.bluetooth) {
      navigator.bluetooth
        .requestDevice({
          acceptAllDevices: true,
          optionalServices: [0x2a19, 0x2a20],
        })
        .then((d: any) => {
          let device = d;
          console.log('device:', device);

          return device?.gatt?.connect();
        })
        .then((s: any) => {
          console.log(s);

          console.log(s?.device.id);
          this.bangleServer = s;
        })
        .then(() => {
          this.isConnected = true;
        });
    }
  }

  batteryService() {
    console.log('checking battery level...');

    if (!this.isConnected) {
      this.messageService.add({
        severity: 'custom',
        icon: 'pi pi-sync',
        summary: 'Sincronizzazione non disponibile',
        closable: false,
        detail: 'Nessun dispositivo connesso',
      });
    }

    this.bangleServer
      .getPrimaryService(0x2a20)
      .then((battSrv: any) => {
        console.log('got battService:', battSrv);

        return battSrv.getCharacteristic(0x2a20);
      })
      .then((battCh: any) => {
        console.log('got battCharacteristic:', battCh);

        battCh.readValue().then((w: any) => {
          this.totalSeconds = new Uint8Array(w.buffer)[0];

          this.storeSelector.clientSecret_write$.subscribe((data) => {
            this.writeAcessToken = data;

            console.log('Il mio WR clientSecret: ' + this.writeAcessToken);

            this.attivitaService
              .postActivity(this.writeAcessToken, this.totalSeconds)
              .subscribe(() => {
                console.log('Sto postando merdina!!');

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

                        this.messageService.add({
                          severity: 'success',
                          summary: 'Aggiornamento attività',
                          closable: false,
                          detail: 'Nuova attività inserita',
                        });
                      });
                  }, 0);
                });
              });
          });
        });
      });
  }
}
