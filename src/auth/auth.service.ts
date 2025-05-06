import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

import { Repository, DataSource } from 'typeorm';
import { RefreshToken } from './entity/refresh-token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
      private dataSource: DataSource,
      private userService: UserService,
      private jwtService: JwtService,
      @InjectRepository(RefreshToken) private refreshTokenRepository: Repository<RefreshToken>
      ) {}

  async signup(email: string, password: string) {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      let error;
      try {
        const user = await this.userService.findOneByEmail(email);
        if (user) throw new BadRequestException('email found');
       
        
        //hash(data: string, saltOrRounds: string | number): Promise<string>
        const saltR = 10;
        const hashedPwd = await bcrypt.hash(password, saltR);

        const userEntity = queryRunner.manager.create(User, { email, password: hashedPwd });
        await queryRunner.manager.save(userEntity);

        const accessToken = this.generateAccessToken(userEntity.id);
        const refreshTokenValue = this.generateRefreshToken(userEntity.id);
        const refreshTokenEntity = queryRunner.manager.create(RefreshToken, { user: { id: userEntity.id }, token: refreshTokenValue });
        await queryRunner.manager.save(refreshTokenEntity);

        await queryRunner.commitTransaction();

        return { id:userEntity.id, accessToken, refreshToken: refreshTokenValue }
      } catch(e) {
        await queryRunner.rollbackTransaction();
        error = e;
      } finally {
        await queryRunner.release();
        if(error) throw error;
      }
  }

  async login(email: string, password: string) {
      const user = this.validateUser(email, password)
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

  private async validateUser(email: string, password: string): Promise<User> {
      const user = await this.userService.findOneByEmail(email)
      if(!user) throw new UnauthorizedException('email is wrong - login')      
      
      const isMatch = await bcrypt.compare(password, user.password)
      if(!isMatch) throw new UnauthorizedException('pwd is wrong - login')
      return user;
  }
}
