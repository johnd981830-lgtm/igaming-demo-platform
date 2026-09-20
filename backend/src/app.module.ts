import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { SportsbookModule } from './sportsbook/sportsbook.module';
import { CasinoModule } from './casino/casino.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [AuthModule, WalletModule, SportsbookModule, CasinoModule, AdminModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
