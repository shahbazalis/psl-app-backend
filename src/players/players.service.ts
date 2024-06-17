import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PlayersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPlayer: Prisma.PlayerCreateInput) {
    let defaultTeam = await this.databaseService.team.findFirst({
      where: { name: 'Default Team' },
    });

    // If the default team doesn't exist, create it
    if (!defaultTeam) {
      defaultTeam = await this.databaseService.team.create({
        data: { name: 'Default Team' },
      });
    }

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

  async findAll(role?: 'BATTER' | 'BOWLER' | 'ALLROUNDER') {
    if (role) {
      return await this.databaseService.player.findMany({
        where: {
          role,
        },
      });
    }
    return await this.databaseService.player.findMany();
  }

  async findOne(id: string) {
    return await this.databaseService.player.findUnique({
      where: {
        id,
      },
    });
  }

  async findOneUsingEmail(email: string) {
    return await this.databaseService.player.findUnique({
      where: {
        email,
      },
    });
  }

  async update(id: string, updatePlayer: Prisma.PlayerUpdateInput) {
    return await this.databaseService.player.update({
      where: {
        id,
      },
      data: updatePlayer,
    });
  }

  async remove(id: string) {
    return await this.databaseService.player.delete({
      where: {
        id,
      },
    });
  }
}
