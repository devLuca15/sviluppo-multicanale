import { Component, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';
import { StoreSelector } from 'src/app/store/store-selector';
import { AddProfilo } from 'src/app/store/store-action';

import { Profilo } from 'src/app/model/profilo.class';
import { PrestazioniProfilo } from 'src/app/model/prestazioniProfilo.class';

import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public readAcessToken: string;

  public profilo: Profilo;
  public prestazioniProfilo: PrestazioniProfilo;

  constructor(
    protected store: Store,
    protected storeSelector: StoreSelector,
    protected profileService: ProfileService
  ) {}

  ngOnInit() {
    // ** STORE - Ascoltatore clientSecret_read
    this.storeSelector.clientSecret_read$.subscribe((data) => {
      this.readAcessToken = data;

      setTimeout(() => {
        this.profileService
          .getReadToken(this.readAcessToken)
          .subscribe((data) => {
            this.profilo = data;

            // ** STORE - Inserimento Profilo
            this.store.dispatch(new AddProfilo(this.profilo));
          });
      }, 500);
    });

    // ** STORE - Ascoltatore prestazioniProfilo
    this.storeSelector.prestazioniProfilo$.subscribe((data) => {
      this.prestazioniProfilo = data;
    });
  }
}
