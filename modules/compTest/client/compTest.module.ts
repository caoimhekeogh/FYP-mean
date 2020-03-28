import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent }  from './compTest.component';
import { ReactiveFormComponent }  from './reactive-fauxPas-form.component';
import { UserService } from './services/fauxPas-service';

@NgModule({
  imports: [
        BrowserModule,
      	FormsModule,
      	ReactiveFormsModule
  ],
  declarations: [
        AppComponent,
      	ReactiveFormComponent
  ],
  providers: [
        FauxPasService
  ],
  bootstrap: [
        AppComponent
  ]
})
export class AppModule { }
