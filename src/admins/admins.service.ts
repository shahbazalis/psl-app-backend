import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AdminsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async findAll() {
    try {
      return await this.databaseService.player.findMany({
        where: {
          admin: true,
        },
      });
    } catch (error: any) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updatePlayer: Prisma.PlayerUpdateInput) {
    try {
      return await this.databaseService.player.update({
        where: {
          id,
        },
        data: updatePlayer,
      });
    } catch (error: any) {
      throw new HttpException(
        'Failed to create admin',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const deletdPlayer = await this.databaseService.player.delete({
        where: {
          id,
        },
      });
      return deletdPlayer;
    } catch (error: any) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
