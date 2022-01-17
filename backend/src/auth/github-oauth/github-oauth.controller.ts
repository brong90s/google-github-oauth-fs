import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GithubOauthService } from './github-oauth.service';

@Controller('auth/github-oauth')
export class GithubOauthController {
  constructor(private githubOauthService: GithubOauthService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) 
  githubAccessToken(@Body() code) {
    return this.githubOauthService.githubAccessToken(code)
  }
}
