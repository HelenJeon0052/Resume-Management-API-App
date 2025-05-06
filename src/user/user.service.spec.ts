import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

import { User } from './entity/user.entity';

class MockRepository {
  async findOneBy(query) {
    const user = new User()
    user.email = query.email
    return user
  }
}

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,
        {
          provide: getRepositoryToken(User),
          useClass: MockRepository
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', async () => {
    const email = 'email@nestjs.com'
    const result = await service.findOneByEmail(email)
    expect(result).toBeDefined()
    expect(result?.email).toBe(email);
  });
});
