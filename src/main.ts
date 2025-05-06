import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerCustomOptions ,SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService)
  const port = (config: ConfigService): number => {
    return config.get('PORT') || 8000
  }

  const userr = configService.get<string>('swagger.user');
  const password = configService.get<string>('swagger.password');
  const envStage = configService.get<string>('STAGE');

  const stage = envStage;

  //null check would reduce undefined - ConfigService는 타입 세이프하지 않기 때문에 이런 체크는 실제 운영 코드에선 필수
  if (!userr || !password) {
    throw new Error('Swagger unauthenticated');
  }

  if (!stage) {
    throw new Error('Missing STAGE environment variable');
  }

  const SWAGGER_ENV = ['local', 'dev'];
  if (SWAGGER_ENV.includes(stage)) {
    app.use(
      //path
      ['/docs', '/docs-json'],
      basicAuth({
        //options
        challenge: true,
        users: { [userr]: password }
      })
    )
  }

  
  const config = new DocumentBuilder()
  .setTitle('NestJS Resume-Management')
  .setDescription('API Documentation for Resume Management')
  .setVersion('1.0')
  .addBearerAuth()
  .build()



  const customOption: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true
    }
  }

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document, customOption)

  app.useGlobalPipes (
    new ValidationPipe({
      transform: true,
    })
  )

  await app.listen(port(configService));
  console.log(`running on port ${port(configService)}`)
}
bootstrap();
