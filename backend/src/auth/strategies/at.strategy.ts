import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from 'dotenv';
import { JwtPayload } from '../types';
import { PassportStrategy } from '@nestjs/passport';

config();

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_AT_SECRET,
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
