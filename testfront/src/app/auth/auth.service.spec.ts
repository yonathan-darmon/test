import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Vérifie qu'aucune requête HTTP en attente n'a été oubliée.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send login request', () => {
    const email = 'test@example.com';
    const password = '123456';
    const mockResponse = { token: '12345' };

    service.login(email, password).subscribe(response => {
      expect(response.token).toEqual(mockResponse.token);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(jasmine.objectContaining({
      Email: email,
      Password: password
    }));
    
    req.flush(mockResponse);
  });

  it('should send register request', () => {
    const name = 'John Doe';
    const email = 'john@example.com';
    const password = '123456';
    const mockResponse = { message: 'User created successfully' };
  
    service.register(name, email, password).subscribe(response => {
      expect(response.message).toEqual(mockResponse.message);
    });
  
    const req = httpMock.expectOne(`${service['baseUrl']}/register`);
    expect(req.request.method).toBe('POST');
    
    // Corrigez la comparaison en comparant les propriétés des objets
    expect(req.request.body).toEqual(jasmine.objectContaining({
      Name: name,
      Email: email,
      Password: password
    }));
    
    req.flush(mockResponse);
  });
  
});
