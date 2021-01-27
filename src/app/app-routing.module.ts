import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { MapComponent } from './components/map/map.component';
import { PropertiesComponent } from './components/properties/properties.component';

const routes: Routes = [
  {path:"log-in",component:LogInComponent},
  {path:"properties",component:PropertiesComponent},
  {path:"map",component:MapComponent,children:[{path:"properties",component:PropertiesComponent}]},
  {path:"form",component:FormComponent},
  {path:"**",component:LogInComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
