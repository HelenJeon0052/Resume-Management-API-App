import { BadRequestException, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/common/decorator/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService
    ) {
        super()
    }

    canActivate(cxt: ExecutionContext):boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            cxt.getHandler(),
            cxt.getClass()
        ])
        if (isPublic) {
            return true
        }


        const http = cxt.switchToHttp()
        const { url, headers } = http.getRequest<Request>()
        const match = /Bearer\s(.+)/.exec(headers['authorization'])

        if(!match) {
            console.error('Authorization header is not valid')
            throw new BadRequestException('Authorization header is not valid')
        }

        const token = match[1]

        const decodeValue = this.jwtService.decode(token)

        if(url !== '/api/auth/refresh' && decodeValue['tokenType'] === 'refresh') {
            console.error('Access token is not valid')
            throw new BadRequestException('Access token is not valid')
        }
        
        return super.canActivate(cxt)

    }
}