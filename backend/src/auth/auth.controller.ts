import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthService } from './jwt-auth/jwt-auth.service';
import { Tokens } from './types';
import { GetCurrentUser, GetCurrentUserId, Public } from './decorators';
import { AtGuard, RtGuard } from './guards';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private jwtAuthService: JwtAuthService,
    private authService: AuthService
  ) {}

  @Public()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Body() body): Promise<boolean> {
    return this.jwtAuthService.logout(body.userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.jwtAuthService.refreshTokens(userId, refreshToken);
  }

  @Get('protected')
  @UseGuards(AtGuard)
  getMe() {
    return this.authService.getMe();
  }
}
