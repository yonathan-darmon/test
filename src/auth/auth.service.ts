import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginDto } from 'src/user/dto/user.dto';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) { }

  async register(name: string, email: string, password: string): Promise<UserEntity> {
    // Génération du hash du mot de passe
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    // Création d'un nouvel utilisateur avec le mot de passe hashé
    const user = new UserEntity();
    user.Name = name;
    user.Email = email;
    user.Password = hashedPassword;

    // Sauvegarde de l'utilisateur dans la base de données
    this.userRepository.create(user);
    return this.userRepository.save(user)
  }


  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.userRepository.findOne({ where: { Email: loginDto.Email } });
    if (!user || !(await bcrypt.compare(loginDto.Password, user.Password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.Email, sub: user.User_ID };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
}
