import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerCustomOptions ,SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService)
  const port = (config: ConfigService): number => {
    return config.get('PORT') || 8000
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
