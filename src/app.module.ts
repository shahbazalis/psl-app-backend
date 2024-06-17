import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { PlayersModule } from './players/players.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [AuthModule, DatabaseModule, PlayersModule, TeamsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
