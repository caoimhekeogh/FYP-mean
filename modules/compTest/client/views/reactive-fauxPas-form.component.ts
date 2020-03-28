import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';

import { FauxPasService } from './services/fauxPas-service';
import { FauxPas } from './config/fauxPas';

@Component({
   selector: 'app-reactive',
   templateUrl: './form-fauxPas-compTest.client.view.html',
//   styleUrls: ['./style.css']
})
export class ReactiveFormComponent {
        isValidFormSubmitted: boolean = null;
        fauxPasForm = new FormGroup;
	   /*   fauxPasForm = new FormGroup({
	      detQFPSS1: new FormControl('', Validators.required),
	      idQFPSS1: new FormControl('') */
	});

	fauxPas = new FauxPas();
	constructor(private fb: FormBuilder,
              private fauxPasService: FauxPasService) {
                this.fauxPasForm = this.fb.group({
                  detQFPSS1: new FormControl('', Validators.required),
                  idQFPSS1: new FormControl('')
                });
	}

  onFormSubmit() {
	   this.isValidFormSubmitted = false;
	   if(this.fauxPasForm.invalid){
		return;
	   }
	   this.isValidFormSubmitted = true;
	   console.log(this.fauxPasForm.valid);
	   this.fauxPas.detQFPSS1 = this.fauxPasForm.get('detQFPSS1').value;
	   this.fauxPas.idQFPSS1 = this.fauxPasForm.get('idQFPSS1').value;
	   this.fauxPasService.createFauxPas(this.fauxPas);
	   this.reset();
	}

	reset() {
	   this.fauxPasForm.reset({

	   });
	}
}
