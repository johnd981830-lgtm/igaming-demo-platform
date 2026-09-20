import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SportsbookService } from './sportsbook.service';
import { PlaceBetDto } from './dto/place-bet.dto';

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
  placeBet(@Body() dto: PlaceBetDto) {
    return this.sportsbookService.placeBet(dto.userId, dto.matchId, dto.selection, Number(dto.stake));
  }
}
