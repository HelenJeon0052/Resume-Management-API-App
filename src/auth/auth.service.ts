import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import { RefreshToken } from './entity/refresh-token.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
      private userService: UserService,
      private jwtService: JwtService,
      @InjectRepository(RefreshToken) private refreshTokenRepository: Repository<RefreshToken>
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

      const refreshToken = this.generateRefreshToken(user.id)

      await this.createRefreshTokenUser(user.id, refreshToken)

      return {
            accessToken: this.jwtService.sign({ sub:user.id }),
            refreshToken,
      };
  }


  async refresh(refreshToken: string | null, userId: string) {
    if (!refreshToken) {
      throw new BadRequestException('Refresh token is required');
    }
    const refreshTokenEntity = await this.refreshTokenRepository.findOneBy({ token: refreshToken })
    if(!refreshTokenEntity) { throw new BadRequestException('Refresh token not exist') }
    const accessToken = this.generateAccessToken(userId)
    const refreshTokenValue = this.generateRefreshToken(userId)
    refreshTokenEntity.token = refreshTokenValue
    await this.refreshTokenRepository.save(refreshTokenEntity)

    return { accessToken, refreshTokenValue }
  }

  private generateRefreshToken(userId: string) {
    const payload = { sub: userId, tokenType: 'refresh' }
    return this.jwtService.sign(payload, { expiresIn: '1d' })
  } 

  private generateAccessToken(userId: string) {
    const payload = { sub: userId, tokenType: 'access' }
    return this.jwtService.sign(payload, { expiresIn: '1d' })
  }

  private async createRefreshTokenUser(userId: string, refreshToken: string) {
    let refreshTokenEntity = await this.refreshTokenRepository.findOneBy({ user: { id: userId }})

    if(refreshTokenEntity) {
        refreshTokenEntity.token = refreshToken
    } else {
        refreshTokenEntity = this.refreshTokenRepository.create({ user: { id: userId }, token: refreshToken })
    }

    await this.refreshTokenRepository.save(refreshTokenEntity)
    
  }
}
