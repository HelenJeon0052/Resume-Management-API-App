import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(config: ConfigService) {
        const jwtSecret = config.get<string>('jwt.secret');

        if (!jwtSecret) {
            throw new Error('JWT secret is not defined!');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret
        })
    }
    
    async validate(payload: any) {
        return { id: payload.sub } //sub(user.id) => id
    }
}