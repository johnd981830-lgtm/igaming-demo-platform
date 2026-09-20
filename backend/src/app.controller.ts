import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/health')
  health() {
    return { status: 'ok', message: 'iGaming backend is online' };
  }
}
