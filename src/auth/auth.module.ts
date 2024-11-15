import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { sign } from 'crypto';

export const jwtSecret = 'zjP9h6ZI5LoSKCSj'


@Module({
  imports :[
    PrismaModule,
    PassportModule,
    JwtModule.register({
    secret:jwtSecret,
    signOptions:{expiresIn:'5m'},})
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
