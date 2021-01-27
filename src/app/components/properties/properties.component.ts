import { Component, OnInit } from '@angular/core';
import { Prop } from 'src/app/prop';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  p:Prop=new Prop()
  faCoffee=faCoffee;
  constructor(private primengConfig:PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

  }
foo(){}
}
