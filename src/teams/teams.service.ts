import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TeamsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createTeam: Prisma.TeamCreateInput) {
    return this.databaseService.team.create({
      data: createTeam,
    });
  }

  async findAll() {
    return await this.databaseService.team.findMany();
  }

  async findOne(id: string) {
    return await this.databaseService.team.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateTeam: Prisma.TeamUpdateInput) {
    return await this.databaseService.team.update({
      where: {
        id,
      },
      data: updateTeam,
    });
  }

  async remove(id: string) {
    return await this.databaseService.team.delete({
      where: {
        id,
      },
    });
  }
}
