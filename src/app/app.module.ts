import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { AlertModule, DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { TextboxAutocompleteDirective } from './textbox-autocomplete.directive';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    TextboxAutocompleteDirective
  ],
  imports: [
    routing,
    AlertModule,
    DatepickerModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
