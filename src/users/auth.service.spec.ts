import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let mockUserService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    mockUserService = {
      find: (email) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 99999999),
          email,
          password,
        } as User;

        users.push(user);
        return Promise.resolve(user);
      },
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUserService },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('create a new user with salted and hashed password ', async () => {
    const user = await service.signup('user1@test.com', 'fghdsaojnfadsln');
    expect(user.password).not.toEqual('fghdsaojnfadsln');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throw error if signup with email id already in use', async () => {
    await service.signup('asdf@asdf.com', 'asdf');

    await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throw error if signed in with wrong email', async () => {
    await expect(service.signin('asdf@asdf.com', 'asdf')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('throw error if signin password is invalid', async () => {
  
    await service.signup('abcd@abcd.com', 'asdf')

    await expect(service.signin('abcd@abcd.com', 'qwerty')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('returns user if signin password is valid', async () => {
    await service.signup('asdf@asdf.com', 'asdf');
    const user = await service.signin('asdf@asdf.com', 'asdf');
    expect(user).toBeDefined();
  });
});
