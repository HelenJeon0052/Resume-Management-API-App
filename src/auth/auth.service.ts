import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
      private userService: UserService,
      private jwtService: JwtService
      ) {}

  async validateUser(email: string, password: string): Promise<any> {
        return null;
  }

  async signup(email: string, password: string) {
      const user = await this.userService.findOneByEmail(email)
      if (user) throw new BadRequestException('Email exist - signup')
      
      const newUser = await this.userService.create(email, password)
      return newUser;
  }

  async login(email: string, password: string) {
      const user = await this.userService.findOneByEmail(email)
      if(!user) throw new UnauthorizedException('email is wrong - login')

      const isMatch = (password === user.password)
      if(!isMatch) throw new UnauthorizedException('pwd is wrong - login')
      return {
            accessToken: this.jwtService.sign({ sub:user.id })
      };
  }
}
