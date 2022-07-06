import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Attivita } from '../model/attivita.class';
import { PrestazioniProfilo } from '../model/prestazioniProfilo.class';
import { Profilo } from '../model/profilo.class';

import { StoreState } from './store.state';

@Injectable()
export class StoreSelector {
  @Select(StoreState.getProfilo) profilo$: Observable<Profilo>;
  @Select(StoreState.getPrestazioniProfilo) prestazioniProfilo$: Observable<PrestazioniProfilo>;

  @Select(StoreState.getAttivita) attivita$: Observable<Attivita[]>;
  
  @Select(StoreState.getClientSecret_read) clientSecret_read$: Observable<string>;
  @Select(StoreState.getClientSecret_write) clientSecret_write$: Observable<string>;
}
