import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/compiler";
import { NgModule } from "@angular/core";
import { LogInComponent } from "./log-in.component";


@NgModule({
    declarations: [ LogInComponent ],
    exports: [ LogInComponent ],
    imports: [ CommonModule ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  })
  export class LogInModule {}