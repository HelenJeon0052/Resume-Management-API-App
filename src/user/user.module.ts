import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

const UserMockService = {
  findAll: () => {
    return 'UserMockService'
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}

/** ,
  providers: [{
    provide: UserService,
    useValue: UserMockService
  }]*/