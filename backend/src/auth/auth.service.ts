import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { users } from '../mock-data';

@Injectable()
export class AuthService {
  private buildUserPayload(user: typeof users[number]) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      balance: user.balance,
    };
  }

  login(email: string, password: string) {
    const safeEmail = email?.trim().toLowerCase();
    const safePassword = password?.trim();

    if (!safeEmail || !safePassword) {
      return { ok: false, message: 'Email and password are required.' };
    }

    const user = users.find((u) => u.email.toLowerCase() === safeEmail && u.password === safePassword);

    if (!user) {
      return { ok: false, message: 'Invalid email or password.' };
    }

    return {
      ok: true,
      token: `demo-token-${uuid()}`,
      user: this.buildUserPayload(user),
    };
  }

  getProfile(userId: string) {
    const safeUserId = userId?.trim();

    if (!safeUserId) {
      return { ok: false, message: 'User id is required.' };
    }

    const user = users.find((u) => u.id === safeUserId);
    if (!user) {
      return { ok: false, message: 'User not found.' };
    }

    return {
      ok: true,
      user: this.buildUserPayload(user),
    };
  }
}
