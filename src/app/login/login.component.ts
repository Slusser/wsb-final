import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'wsb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  email: string;
  password: string;
    
  constructor(public authService: AuthService, private router: Router){}

  ngOnInit() {
    setTimeout(()=>{
      if(this.authService.authState!=null){
        this.router.navigateByUrl('/admin-panel');
      }
    },1000)
  }

  onSubmit(formData) {
    if (formData.valid) {this.authService.login(formData.value.email, formData.value.password);}
  }
}
