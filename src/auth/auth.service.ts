import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
        return null;
  }

  async signup(email: string, password: string) {
        return;
  }

  async login(user: any) {
        return;
  }
}
