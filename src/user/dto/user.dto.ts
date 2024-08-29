export class CreateUserDto {
    readonly Name: string;
    readonly Email: string;
    readonly Password: string;
  }
  export class LoginDto {
    readonly Email: string;
    readonly Password: string;
  }
    