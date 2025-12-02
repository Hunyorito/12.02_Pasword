import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as argon2 from 'argon2';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    
    private readonly userService: UsersService
  ) {}

  @Post('login')
  async login(@Body() loginDto:LoginDto) {
    const user= await this.userService.findUserByEmail(loginDto.email)
    if(user===null){
      throw new ForbiddenException('Invalid email or password');
    }
    if(!(await argon2.verify(user.password,loginDto.password))){
      throw new ForbiddenException('Invalid email or password');
    }
    return{
      token: await this.userService.createToken(user.id);
    } 
    //await argon2.verify(user.password,loginDto.password);
    // jelszó stim , ha igen token general és visza adáss

  }
}
