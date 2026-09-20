import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CasinoService } from './casino.service';

@Controller('casino')
export class CasinoController {
  constructor(private readonly casinoService: CasinoService) {}

  @Get('games')
  getGames() {
    return this.casinoService.getGames();
  }

  @Post('play')
  playGame(@Body() body: { userId: string; gameId: string; wager: number }) {
    return this.casinoService.playGame(body.userId, body.gameId, Number(body.wager));
  }
}
