import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';
import { google, Auth } from 'googleapis';
import { config } from 'dotenv';

config();

@Injectable()
export class GoogleOauthService {
  oauth2Client: Auth.OAuth2Client;
  constructor(private jwtAuthService: JwtAuthService) {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = 'http://localhost:5000/auth/google/redirect';

    this.oauth2Client = new google.auth.OAuth2(
      clientID,
      clientSecret,
      redirectUri,
    );
  }

  async googleAccessToken(body) {
    if (!body) {
      throw new HttpException('Forbidden', HttpStatus.BAD_REQUEST);
    }

    const token = body.idToken;
    try {
      const ticket = await this.oauth2Client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const { name, email, picture, sub } = ticket.getPayload();

      console.log(name, email, picture, sub);

      // check if this email || id exist in database
      // 1. if not create else.
      // 2. just ignore.

      // sub : just for temp testing, when actual using uuid instead.
      const tokens = await this.jwtAuthService.getTokens(sub, email);
      await this.jwtAuthService.updateRtHash(sub, tokens.refresh_token);

      console.log(tokens);

      return tokens;
    } catch (err) {
      console.log(body.idToken);
      throw new HttpException('Invalid tokens', HttpStatus.BAD_REQUEST);
    }
  }
}
