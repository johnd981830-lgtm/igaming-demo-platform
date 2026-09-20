import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  private payload(user: any) { return { id: user.id, email: user.email, username: user.username, role: user.role.toLowerCase(), balance: Number(user.balance) }; }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email?.trim().toLowerCase() } });
    if (!user || user.password !== password?.trim()) return { ok: false, message: 'Invalid email or password.' };
    return { ok: true, token: `demo-token-${uuid()}`, user: this.payload(user) };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId?.trim() } });
    return user ? { ok: true, user: this.payload(user) } : { ok: false, message: 'User not found.' };
  }
}
