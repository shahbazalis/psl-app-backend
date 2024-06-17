import {
  Body,
  Controller,
  Post,
  BadRequestException,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Prisma } from '@prisma/client';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}
  @Post('create')
  async create(@Body() teamsPayload: Prisma.PlayerCreateInput) {
    const team = await this.teamsService.create(teamsPayload);
    console.log(team);
    if (team) return team;
    else throw new BadRequestException();
  }

  @Get()
  async findAll() {
    const teams = await this.teamsService.findAll();
    console.log('Players', teams);
    return teams;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const team = await this.teamsService.findOne(id);
    return team;
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeam: Prisma.TeamUpdateInput) {
    return this.teamsService.update(id, updateTeam);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(id);
  }
}
