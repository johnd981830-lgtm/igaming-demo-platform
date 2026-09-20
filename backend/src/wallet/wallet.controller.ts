import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('ledger')
  getLedger(@Query('userId') userId: string) {
    return this.walletService.getLedger(userId);
  }

  @Post('deposit')
  deposit(@Body() body: { userId: string; amount: number }) {
    return this.walletService.deposit(body.userId, Number(body.amount));
  }

  @Post('withdraw')
  withdraw(@Body() body: { userId: string; amount: number }) {
    return this.walletService.withdraw(body.userId, Number(body.amount));
  }
}
