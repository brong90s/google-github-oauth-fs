import { Module } from '@nestjs/common';
import { JwtAuthModule } from '../jwt-auth/jwt-auth.module';
import { GoogleOauthController } from './google-oauth.controller';
import { GoogleOauthService } from './google-oauth.service';

@Module({
  imports: [JwtAuthModule],
  controllers: [GoogleOauthController],
  providers: [GoogleOauthService]
})
export class GoogleOauthModule {}
