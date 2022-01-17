import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
// import * as argon from 'argon2';
import { JwtPayload, Tokens } from '../types';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  async logout(userId): Promise<boolean> {
    // update hashedRt to null

    console.log(userId);
    return true;
  }

  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    // get hashedRt from DB, but just create user obj for testing
    const user = {
      hashedRt:
        '$argon2i$v=19$m=4096,t=3,p=1$Vf16MVNrNwLXtDL7eW885Q$Ijj6Kv2ZAKcfMApZOW/M6PDX9lS7qT3eZOEO23Xu2CY',
      id: '117185989071426571827',
      email: 'hearong.200@gmail.com',
    };

    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await argon.hash(rt);

    // update hashedRt to DB

    console.log(hash);
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_AT_SECRET,
        expiresIn: 60 * 15,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_RT_SECRET,
        expiresIn: 60 * 60 * 24 * 7,
      }),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
