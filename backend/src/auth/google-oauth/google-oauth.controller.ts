import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GoogleOauthService } from './google-oauth.service';

@Controller('auth/google-oauth')
export class GoogleOauthController {
  constructor(private googleOauthService: GoogleOauthService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async googleOauth(@Body() body: any) {
    return this.googleOauthService.googleAccessToken(body);
  }
}
