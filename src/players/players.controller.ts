import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Query,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}
  @Post('register')
  async register(@Body() playersPayload: Prisma.PlayerCreateInput) {
    const player = await this.playersService.create(playersPayload);
    return player;
  }

  @Get()
  //@UseGuards(JwtAuthGuard)
  async findAll(@Query('role') role?: 'BATTER' | 'BOWLER' | 'ALLROUNDER') {
    const players = await this.playersService.findAll(role);
    return players;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    const player = await this.playersService.findOne(id);
    return player;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updatePlayer: Prisma.PlayerUpdateInput,
  ) {
    const updatedPlayer = await this.playersService.update(id, updatePlayer);
    return updatedPlayer;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const deletedPlayer = this.playersService.remove(id);
    return deletedPlayer;
  }
}
