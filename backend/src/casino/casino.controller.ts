import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CasinoService } from './casino.service';
import { PlayGameDto } from './dto/play-game.dto';

@Controller('casino')
export class CasinoController {
  constructor(private readonly casinoService: CasinoService) {}

  @Get('games')
  getGames() {
    return this.casinoService.getGames();
  }

  @Get('results')
  getRecentResults(@Query('userId') userId: string) {
    return this.casinoService.getRecentResults(userId);
  }

  @Post('play')
  playGame(@Body() dto: PlayGameDto) {
    return this.casinoService.playGame(dto.userId, dto.gameId, Number(dto.wager));
  }
}
