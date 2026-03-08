import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(private readonly UsersServices: UsersService) {}
  getHello(): string {
    return this.UsersServices.getHello();
  }
}
