import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [RegisterComponent],
      providers: [AuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService register method on form submit', () => {
    const name = 'John Doe';
    const email = 'john@example.com';
    const password = '123456';
    const mockResponse = { message: 'User created successfully' };
  
    component.name = name;
    component.email = email;
    component.password = password;
  
    spyOn(authService, 'register').and.callThrough();
  
    component.onSubmit();
  
    const req = httpMock.expectOne(`${authService['baseUrl']}/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(jasmine.objectContaining({
      Name: name,
      Email: email,
      Password: password
    }));
    req.flush(mockResponse);
  
    expect(authService.register).toHaveBeenCalledWith(name, email, password);
  });
  
  it('should handle successful registration', () => {
    const name = 'John Doe';
    const email = 'john@example.com';
    const password = '123456';
    const mockResponse = { message: 'User created successfully' };

    spyOn(console, 'log'); // Spy on console.log to test if it gets called

    component.name = name;
    component.email = email;
    component.password = password;

    component.onSubmit();

    const req = httpMock.expectOne(`${authService['baseUrl']}/register`);
    req.flush(mockResponse);

    expect(console.log).toHaveBeenCalledWith('Registration successful', mockResponse);
  });

  it('should handle registration failure', () => {
    const name = 'John Doe';
    const email = 'john@example.com';
    const password = '123456';
    const mockError = new HttpErrorResponse({
      error: 'Registration failed',
      status: 500,
      statusText: 'Internal Server Error',
      url: 'http://localhost:3000/api/auth/register'
    });
  
    spyOn(console, 'error'); // Spy on console.error to test if it gets called
  
    component.name = name;
    component.email = email;
    component.password = password;
  
    component.onSubmit();
  
    const req = httpMock.expectOne(`${authService['baseUrl']}/register`);
    req.flush('Registration failed', { status: 500, statusText: 'Internal Server Error' });
  
    expect(console.error).toHaveBeenCalledWith('Registration failed', jasmine.objectContaining({
      message: jasmine.stringMatching(/Http failure response for/),
      name: 'HttpErrorResponse'
    }));
  });
  
});
