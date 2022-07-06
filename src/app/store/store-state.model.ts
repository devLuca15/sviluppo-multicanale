import { Attivita } from '../model/attivita.class';
import { PrestazioniProfilo } from '../model/prestazioniProfilo.class';
import { Profilo } from '../model/profilo.class';

export class StoreStateModel {
  // ?? Informazioni profilo
  profilo: Profilo;
  prestazioniProfilo: PrestazioniProfilo;

  // ?? Lista attività
  attivita: Attivita[] = [];

  // ?? Tokens
  readClientSecret: string;
  writeClientSecret: string;
}
