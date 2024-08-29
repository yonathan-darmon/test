import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService,private router:Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(response => {
      console.log('Login successful', response);
      this.router.navigate(['/dashboard']);
   
    }, error => {
      console.error('Login failed', error);
    });
  }
}
