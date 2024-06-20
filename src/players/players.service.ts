import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PlayersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPlayer: Prisma.PlayerCreateInput) {
    try {
      let defaultTeam = await this.databaseService.team.findFirst({
        where: { name: 'Default Team' },
      });

      // If the default team doesn't exist, create it
      if (!defaultTeam) {
        defaultTeam = await this.databaseService.team.create({
          data: { name: 'Default Team' },
        });
      }

      // Check if a player with the same email or name already exists
      const existingPlayer = await this.databaseService.player.findFirst({
        where: {
          OR: [{ email: createPlayer.email }, { name: createPlayer.name }],
        },
      });

      if (existingPlayer) {
        const existingField =
          existingPlayer.email === createPlayer.email ? 'email' : 'name';
        throw new HttpException(
          `Player with the same ${existingField} already exists`,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        // Create a new player and assign them to the default team
        const newPlayer = await this.databaseService.player.create({
          data: {
            name: createPlayer.name,
            email: createPlayer.email,
            password: await bcrypt.hash(createPlayer.password, 10),
            role: createPlayer.role,
            phoneNumber: createPlayer.phoneNumber,
            nationality: createPlayer.nationality,
            status: 'UNSOLD',
            team: { connect: { id: defaultTeam.id } },
          },
        });

        return newPlayer;
      }
    } catch (error: any) {
      throw new HttpException(
        `Failed to create player. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(role?: 'BATTER' | 'BOWLER' | 'ALLROUNDER') {
    try {
      if (role) {
        return await this.databaseService.player.findMany({
          where: {
            role,
          },
        });
      }
      return await this.databaseService.player.findMany();
    } catch (error: any) {
      throw new HttpException(
        'Interal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      return await this.databaseService.player.findUnique({
        where: {
          id,
        },
      });
    } catch (error: any) {
      throw new HttpException(
        'Interal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneUsingEmail(email: string) {
    try {
      return await this.databaseService.player.findUnique({
        where: {
          email,
        },
      });
    } catch (error: any) {
      throw new HttpException(
        'Interal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updatePlayer: Prisma.PlayerUpdateInput) {
    try {
      console.log('Update Player:', updatePlayer);
      return await this.databaseService.player.update({
        where: {
          id,
        },
        data: updatePlayer,
      });
    } catch (error: any) {
      throw new HttpException(
        'Interal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      return await this.databaseService.player.delete({
        where: {
          id,
        },
      });
    } catch (error: any) {
      throw new HttpException(
        'Interal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
