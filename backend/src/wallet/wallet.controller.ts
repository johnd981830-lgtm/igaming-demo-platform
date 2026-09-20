import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletActionDto } from './dto/wallet-action.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('ledger')
  getLedger(@Query('userId') userId: string) {
    return this.walletService.getLedger(userId);
  }

  @Post('deposit')
  deposit(@Body() dto: WalletActionDto) {
    return this.walletService.deposit(dto.userId, Number(dto.amount));
  }

  @Post('withdraw')
  withdraw(@Body() dto: WalletActionDto) {
    return this.walletService.withdraw(dto.userId, Number(dto.amount));
  }
}
