import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServService } from 'src/app/services/app-serv.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private router:Router,private appser:AppServService) { }
  title = 'נא להכניס שם משתמש וסיסמה';
  ngOnInit(): void {
  }
  name:string=""
  password:string=""
  isExist(name:string,password:string)
  {
   this.appser.chechIsExist(name,password).subscribe(data=>
   {
     
      
      this.appser.x1=data;
       if(this.appser.x1==0){
             alert("עליך להירשם קודם!");
             this.router.navigate(['/form']);
          }
    else{
        this.router.navigate(['/map']);
    }}
   ,err=>{ alert("שגיאה בגישה לשרת")})  
  }  
  Foo1(){
       this.router.navigate(["/form"])
   }

}
