import { Module } from '@nestjs/common';
import { JwtAuthModule } from '../jwt-auth/jwt-auth.module';
import { GithubOauthController } from './github-oauth.controller';
import { GithubOauthService } from './github-oauth.service';

@Module({
  imports: [JwtAuthModule],
  controllers: [GithubOauthController],
  providers: [GithubOauthService]
})
export class GithubOauthModule {}
