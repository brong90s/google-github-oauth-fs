import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy, RtStrategy } from '../strategies';
import { JwtAuthService } from './jwt-auth.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [JwtAuthService, AtStrategy, RtStrategy],
  exports: [JwtAuthService]
})
export class JwtAuthModule {}
