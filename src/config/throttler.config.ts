import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { ExecutionContext } from '@nestjs/common';


const PROTECTED = '127.0.0.1'

export const throttlerConfig: ThrottlerModuleOptions = {
  errorMessage: (context, detail) =>
    `요청이 너무 많습니다. ${detail.ttl}초 후 다시 시도해주세요.`,
  throttlers: [
    {
      name: 'global',
      limit: 20,
      ttl: 60,
    },
    {
      name: 'login',
      limit: (context) => {
        const req = context.switchToHttp().getRequest();
        return req.ip === PROTECTED ? 50 : 5;
      },
      ttl: 60,
      blockDuration: 30, // 초과 시 차단 시간
    },
  ],
};
