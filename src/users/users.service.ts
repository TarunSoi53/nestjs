import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
    constructor(private configService: ConfigService) {}
    getHello(): string {
        const appname =this.configService.get<string>("appname");
        return "Hello from " + appname;
    }
}
