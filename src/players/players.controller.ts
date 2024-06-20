import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { Prisma } from '@prisma/client';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}
  @Post('register')
  async register(@Body() playersPayload: Prisma.PlayerCreateInput) {
    const player = await this.playersService.create(playersPayload);
    return player;
  }

  @Get()
  async findAll(@Query('role') role?: 'BATTER' | 'BOWLER' | 'ALLROUNDER') {
    const players = await this.playersService.findAll(role);
    return players;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const player = await this.playersService.findOne(id);
    return player;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlayer: Prisma.PlayerUpdateInput,
  ) {
    return this.playersService.update(id, updatePlayer);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playersService.remove(id);
  }
}
