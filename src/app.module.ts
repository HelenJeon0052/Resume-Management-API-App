import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';


import { AppService } from './app.service';
import { AnalyticsModule } from './analytics/analytics.module';
import { AnalyticsService } from './analytics/analytics.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ResumesController } from './resumes/resumes.controller';
import { ResumesModule } from './resumes/resumes.module';


import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AnalyticsModule,
    AuthModule,
    UserModule,
    ResumesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT') || '5432'),
        username: 'postgres',
        password: config.get('DB_PASSWORD'),
        database: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      })
  })],
  controllers: [AppController, ResumesController],
  providers: [AppService, AnalyticsService],
})
export class AppModule {}