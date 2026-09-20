import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { SportsbookModule } from './sportsbook/sportsbook.module';
import { CasinoModule } from './casino/casino.module';
import { AdminModule } from './admin/admin.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule, AuthModule, WalletModule, SportsbookModule, CasinoModule, AdminModule],
  controllers: [AppController],
})
export class AppModule {}
