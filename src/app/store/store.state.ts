import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Attivita } from '../model/attivita.class';
import { PrestazioniProfilo } from '../model/prestazioniProfilo.class';
import { Profilo } from '../model/profilo.class';

import {
  AddAttivita,
  AddClientSecret_read,
  AddClientSecret_write,
  AddPrestazioniProfilo,
  AddProfilo,
} from './store-action';
import { StoreStateModel } from './store-state.model';

@State<StoreStateModel>({
  name: 'refertoStateModel',
  defaults: new StoreStateModel(),
})
@Injectable()
export class StoreState {
  constructor() {}

  @Selector()
  static getProfilo(state: StoreStateModel): Profilo {
    return state?.profilo;
  }

  @Selector()
  static getPrestazioniProfilo(state: StoreStateModel): PrestazioniProfilo {
    return state?.prestazioniProfilo;
  }

  @Selector()
  static getAttivita(state: StoreStateModel): Attivita[] {
    return state?.attivita;
  }

  @Selector()
  static getClientSecret_read(state: StoreStateModel): string {
    return state?.readClientSecret;
  }

  @Selector()
  static getClientSecret_write(state: StoreStateModel): string {
    return state?.writeClientSecret;
  }

  // !! SET - Profilo

  @Action(AddProfilo)
  addProfilo(
    { getState, patchState }: StateContext<StoreStateModel>,
    addProfilo: AddProfilo
  ) {
    const profilo1 = addProfilo.profilo;

    patchState({
      profilo: profilo1,
    });
  }

  // !! SET - Prestazioni Profilo

  @Action(AddPrestazioniProfilo)
  addPrestazioniProfilo(
    { getState, patchState }: StateContext<StoreStateModel>,
    addPrestazioniProfilo: AddPrestazioniProfilo
  ) {
    const prestazioniProfilo1 = addPrestazioniProfilo.prestazioniProfilo;

    patchState({
      prestazioniProfilo: prestazioniProfilo1,
    });
  }

  // !! SET - Attivita

  @Action(AddAttivita)
  addAttivita(
    { getState, patchState }: StateContext<StoreStateModel>,
    addAttivita: AddAttivita
  ) {
    const attivita1 = addAttivita.attivita;

    patchState({
      attivita: attivita1,
    });
  }

  // !! SET - ClientSecret (Read)

  @Action(AddClientSecret_read)
  addClientSecret_read(
    { getState, patchState }: StateContext<StoreStateModel>,
    addClientSecret: AddClientSecret_read
  ) {
    const readClientSecret = addClientSecret.clientSecret_read;

    patchState({
      readClientSecret: readClientSecret,
    });
  }

  // !! SET - ClientSecret (Write)

  @Action(AddClientSecret_write)
  addClientSecret_write(
    { getState, patchState }: StateContext<StoreStateModel>,
    addClientSecret: AddClientSecret_write
  ) {
    const writeClientSecret = addClientSecret.clientSecret_write;

    patchState({
      writeClientSecret: writeClientSecret,
    });
  }
}
