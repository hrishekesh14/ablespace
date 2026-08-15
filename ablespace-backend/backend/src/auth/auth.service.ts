import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { UsersService, CURRENT_USER_ID } from '../users/users.service';
import { UserEntity } from '../users/user.entity';

export interface AuthResult {
  user: UserEntity;
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Guest sessions are intentionally not persisted: each call mints a
   * fresh ephemeral identity, matching the frontend's "Continue as Guest"
   * flow which never expects guest data to survive across browsers.
   */
  async loginAsGuest(): Promise<AuthResult> {
    const guest: UserEntity = {
      id: `guest-${randomUUID().slice(0, 8)}`,
      name: 'Guest',
      email: 'guest@ablespace.io',
      avatarColor: '#71717A',
      initials: 'G',
    } as UserEntity;

    return this.issueToken(guest);
  }

  /**
   * Stands in for a real Google OAuth exchange. In production this would
   * verify a Google ID token and upsert the returned profile; here it
   * signs in the seeded demo user so the rest of the flow (JWT issuance,
   * profile updates) is exercised end-to-end.
   */
  async loginWithGoogle(): Promise<AuthResult> {
    const user = await this.usersService.findById(CURRENT_USER_ID);
    return this.issueToken(user);
  }

  private async issueToken(user: UserEntity): Promise<AuthResult> {
    const accessToken = await this.jwtService.signAsync({ sub: user.id, email: user.email });
    return { user, accessToken };
  }
}
