import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { users } from '../mock-data';

@Injectable()
export class AuthService {
  login(email: string, password: string) {
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      return { ok: false, message: 'Invalid email or password' };
    }

    return {
      ok: true,
      token: `demo-token-${uuid()}`,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        balance: user.balance,
      },
    };
  }

  getProfile(userId: string) {
    const user = users.find((u) => u.id === userId);
    if (!user) {
      return { ok: false, message: 'User not found' };
    }

    return {
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        balance: user.balance,
      },
    };
  }
}
