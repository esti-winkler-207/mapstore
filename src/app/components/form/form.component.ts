import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/person';
import { AppServService } from 'src/app/services/app-serv.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  


  disabled: boolean = true;
  p :Person=new Person();
  constructor(private router:Router, private fromService:AppServService) { }
    ngOnInit(): void {
  }
   
   
add()
{
    console.log("pp",this.p)
    this.fromService.add(this.p).subscribe(data=>{
    this.fromService.p1=data;
    console.log(data);
    
    this.router.navigate(['/log-in']);},
    err=>{})
}

}
