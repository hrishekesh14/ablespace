import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService, AuthResult } from './auth.service';
import { JwtAuthGuard, AuthTokenPayload } from './jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserEntity } from '../users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('guest')
  loginAsGuest(): Promise<AuthResult> {
    return this.authService.loginAsGuest();
  }

  @Post('google')
  loginWithGoogle(): Promise<AuthResult> {
    return this.authService.loginWithGoogle();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  updateProfile(
    @Req() request: Request & { user: AuthTokenPayload },
    @Body() dto: UpdateProfileDto,
  ): Promise<UserEntity> {
    return this.usersService.update(request.user.sub, dto);
  }
}
