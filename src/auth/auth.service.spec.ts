import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../user/entity/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<UserEntity>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: { sign: jest.fn().mockReturnValue('token') },  // Mock JwtService here
        },
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const user = {
        Name: 'John Doe',
        Email: 'john@example.com',
        Password: '123456',
      };

      const savedUser = { ...user, Password: 'hashedPassword' } as UserEntity;

      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword'as never);
      jest.spyOn(userRepository, 'create').mockReturnValue(savedUser as never);  // Mock create method
      jest.spyOn(userRepository, 'save').mockResolvedValue(savedUser as never);

      const result = await service.register(user.Name, user.Email, user.Password);

      expect(result).toEqual(savedUser);
      expect(userRepository.create).toHaveBeenCalledWith({
        Name: user.Name,
        Email: user.Email,
        Password: 'hashedPassword',
      });
      expect(userRepository.save).toHaveBeenCalledWith(savedUser);
    });
  });

  describe('login', () => {
    it('should return an access token for valid credentials', async () => {
      const loginDto = {
        Email: 'john@example.com',
        Password: '123456',
      };

      const user = {
        Email: 'john@example.com',
        Password: await bcrypt.hash('123456', 10),
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user as UserEntity);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      const result = await service.login(loginDto);

      expect(result).toEqual({ access_token: 'token' });
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { Email: loginDto.Email } });
      expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.Password, user.Password);
      expect(jwtService.sign).toHaveBeenCalledWith({ email: user.Email, sub: undefined }); // Add User_ID if necessary
    });
  });
});
