import {
  Body,
  Controller,
  Post,
  BadRequestException,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}
  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(@Body() teamsPayload: Prisma.PlayerCreateInput) {
    const team = await this.teamsService.create(teamsPayload);
    if (team) return team;
    else throw new BadRequestException();
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  async findAll() {
    const teams = await this.teamsService.findAll();
    return teams;
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    const team = await this.teamsService.findOne(id);
    return team;
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateTeam: Prisma.TeamUpdateInput) {
    return this.teamsService.update(id, updateTeam);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.teamsService.remove(id);
  }
}
