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

  // async validateUser({ email, password }: AuthPayloadDto): Promise<any> {
  //   try {
  //     const player = await this.playersService.findOneUsingEmail(email);
  //     console.log('Player', player);
  //     if (player && bcrypt.compareSync(password, player.password)) {
  //       const { password, ...result } = player;
  //       return this.jwtService.sign(result);
  //     }
  //   } catch (error) {
  //     console.log('Error:', error);
  //     throw new HttpException(error, HttpStatus.UNAUTHORIZED);
  //   }
  //   //return null;
  // }

  // async login(player: any) {
  //   const payload = { email: player.email, sub: player.id };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  // async register(email: string, password: string) {
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const user = await this.databaseService.player.create({
  //     data: {
  //       email,
  //       password: hashedPassword,
  //     },
  //   });
  //   return this.login(user);
  // }

  // async validateUser({ username, password }: AuthPayloadDto) {
  //   const findUser = fakeUsers.find((user) => user.username === username);
  //   if (!findUser) return null;
  //   if (password === findUser.password) {
  //     const { password, ...user } = findUser;
  //     return this.jwtService.sign(user);
  //   }
  // }
}
