import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import configuration from './config/configuration';


@Module({
  imports: [ConfigModule.forRoot({
     load: [configuration],
    isGlobal: true,
    envFilePath: '.env',
  }),AuthModule, UsersModule, PostsModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
