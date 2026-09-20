import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SportsbookService } from './sportsbook.service';

@Controller('sportsbook')
export class SportsbookController {
  constructor(private readonly sportsbookService: SportsbookService) {}

  @Get('matches')
  getMatches() {
    return this.sportsbookService.getMatches();
  }

  @Get('bets')
  getUserBets(@Query('userId') userId: string) {
    return this.sportsbookService.getUserBets(userId);
  }

  @Post('bet')
  placeBet(@Body() body: { userId: string; matchId: string; selection: string; stake: number }) {
    return this.sportsbookService.placeBet(body.userId, body.matchId, body.selection, Number(body.stake));
  }
}
