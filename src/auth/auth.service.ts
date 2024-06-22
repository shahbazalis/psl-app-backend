import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PlayersService } from '../players/players.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly playersService: PlayersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: AuthPayloadDto): Promise<any> {
    try {
      const player = await this.playersService.findOneUsingEmail(email);

      if (!player) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
      }

      if (!bcrypt.compareSync(password, player.password)) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      // If authentication is successful, sign and return JWT token
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: omitPassword, ...result } = player; // Rename 'password' to 'omitPassword'
      return {
        token: this.jwtService.sign(result),
      };
    } catch (error) {
      throw new HttpException(error.response, HttpStatus.UNAUTHORIZED);
    }
  }
}
