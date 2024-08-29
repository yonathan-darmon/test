import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService,private router:Router) {}

  onSubmit() {
    this.authService.register(this.name, this.email, this.password).subscribe(response => {
      console.log('Registration successful', response);
      this.router.navigate(['/login']);

    }, error => {
      console.error('Registration failed', error);
    });
  }
}
