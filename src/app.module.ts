import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';


import { AppService } from './app.service';
import { AnalyticsModule } from './analytics/analytics.module';
import { AnalyticsService } from './analytics/analytics.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ResumesController } from './resumes/resumes.controller';
import { ResumesModule } from './resumes/resumes.module';
import postgresConfig from './config/postgres.config';

import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    AnalyticsModule,
    AuthModule,
    UserModule,
    ResumesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [postgresConfig, jwtConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        let obj: TypeOrmModuleOptions = {
          type: 'postgres',
          host: config.get('postgres.host'),
          port: parseInt(config.get('DB_PORT') || '5432'),
          username: config.get('postgres.username'),
          password: config.get('postgres.password'),
          database: config.get('postgres.database'),
          autoLoadEntities: true,
        };
        if(config.get('STAGE') === 'local') {
          console.info('Sync postgres')
          obj = Object.assign(obj, {
            synchronize: true,
            logging: true
          })
        }
        return obj
      }
  })],
  controllers: [AppController, ResumesController],
  providers: [AppService, AnalyticsService],
})
export class AppModule {}