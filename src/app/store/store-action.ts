import { Profilo } from '../model/profilo.class';
import { PrestazioniProfilo } from '../model/prestazioniProfilo.class';
import { Attivita } from '../model/attivita.class';

export class AddClientSecret_read {
  static readonly type = '[Client Secret_read] insert one';
  constructor(public clientSecret_read: string) {}
}

export class AddClientSecret_write {
  static readonly type = '[Client Secret_write] insert one';
  constructor(public clientSecret_write: string) {}
}

export class AddProfilo {
  static readonly type = '[Profilo] insert one';
  constructor(public profilo: Profilo) {}
}

export class AddPrestazioniProfilo {
  static readonly type = '[Prestazioni Profilo] insert one';
  constructor(public prestazioniProfilo: PrestazioniProfilo) {}
}

export class AddAttivita {
  static readonly type = '[Attività] insert one';
  constructor(public attivita: Attivita[]) {}
}
