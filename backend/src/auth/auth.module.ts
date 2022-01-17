import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleOauthModule } from './google-oauth/google-oauth.module';
import { JwtAuthModule } from './jwt-auth/jwt-auth.module';
import { GithubOauthModule } from './github-oauth/github-oauth.module';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtAuthModule, GoogleOauthModule, GithubOauthModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
