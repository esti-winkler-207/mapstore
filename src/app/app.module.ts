import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { MapComponent } from './components/map/map.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



//import { AppRoutingModule } from '@angular/';

//import { YuvComponent } from './maps/maps.component';
//import { from } from 'rxjs';

//import { AgmCoreModule } from '@agm/core';





import {CommonModule} from '@angular/common';


import { RippleModule } from 'primeng/ripple';
import {ToastModule} from 'primeng/toast';
import {CheckboxModule} from 'primeng/checkbox';
import {DialogModule} from 'primeng/dialog';


import {TabViewModule} from 'primeng/tabview';


//primeng
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';                  //api
import {GMapModule} from 'primeng/gmap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PasswordModule} from 'primeng/password';
import { RouterModule, Routes } from '@angular/router';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';

import { ButtonModule } from 'primeng/button';
import { CardModule, } from 'primeng/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {InputTextModule} from 'primeng/inputtext';



@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    LogInComponent,
    MapComponent,
    PropertiesComponent
  ],
  imports: [
    BrowserModule,
    
    AppRoutingModule,
    BrowserModule,
    FormsModule,
   // AppRoutingModule,
    HttpClientModule,
    AccordionModule,
    GMapModule,
    BrowserAnimationsModule,
  PasswordModule,
  AppRoutingModule,
  FontAwesomeModule,
  CardModule,
  ButtonModule,
  InputTextModule,
CommonModule,
ToastModule,
CheckboxModule,
DialogModule,
TabViewModule,
RippleModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
