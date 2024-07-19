import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TeamsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createTeam: Prisma.TeamCreateInput) {
    try {
      return this.databaseService.team.create({
        data: createTeam,
      });
    } catch (error: any) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.databaseService.team.findMany({
        include: {
          players: true,
        },
      });
    } catch (error: any) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      return await this.databaseService.team.findUnique({
        where: {
          id,
        },
        include: {
          players: true,
        },
      });
    } catch (error: any) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateTeam: Prisma.TeamUpdateInput) {
    try {
      return await this.databaseService.team.update({
        where: {
          id,
        },
        data: updateTeam,
      });
    } catch (error: any) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      return await this.databaseService.team.delete({
        where: {
          id,
        },
      });
    } catch (error: any) {
      console.log('Error:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
