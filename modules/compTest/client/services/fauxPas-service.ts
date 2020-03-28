import { Injectable } from '@angular/core';

import { FauxPas } from '../config/fauxPas';

@Injectable()
export class FauxPasService {
   createFauxPas(fauxPas: FauxPas) {
           //Log faux pas data in console
           console.log("Story 1. Det Q: " + fauxPas.detQFPSS1);
	         console.log("Story 1. Id Q: " + fauxPas.idQFPSS1);
   }
}
