import { UserDto } from './signUp.dto';
export class LoginDto {
    username: string;
    password: string;
}

export class SignInResponseDto extends UserDto {
    access_token: string;
    refresh_token: string;
}
  