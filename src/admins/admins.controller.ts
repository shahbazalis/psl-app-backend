import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    const players = await this.adminsService.findAll();
    return players;
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updatePlayer: Prisma.PlayerUpdateInput,
  ) {
    const updatedPlayer = await this.adminsService.update(id, updatePlayer);
    return updatedPlayer;
  }
}
