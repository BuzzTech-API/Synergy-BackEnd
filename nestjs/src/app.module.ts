import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { PhysicalRooms } from './entities/physicalrooms.enity';
import { Participate } from './entities/participate.entity';
import { Meetings } from './entities/meetings.entity';
import { Guests } from './entities/guests.entity';
import { Reservations } from './entities/reservations.entity';
import { VirtualRooms } from './entities/virtualrooms.entity';
import { UsersModule } from './models/users/users.module';
import { VirtualroomsModule } from './models/virtualrooms/virtualrooms.module';
import { ReservationsModule } from './models/reservations/reservations.module';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from './auth/auth.interceptor';
import { Presence } from './entities/presence.entity';
import { PhysicalroomsModule } from './models/physicalrooms/physicalrooms.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: 'localhost', //Pra quem n roda o docker
      host: 'db',
      port: 3306,
      username: 'Syatt',
      password: 'Senha123#',
      database: 'api',
      entities: [Users, PhysicalRooms, Participate, Meetings, Guests, Reservations, VirtualRooms, Presence],
      synchronize: false,
      autoLoadEntities: true,
    }),
    UsersModule,
    VirtualroomsModule,
    ReservationsModule,
    AuthModule,
    PhysicalroomsModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: AuthInterceptor,
  }],
})
export class AppModule {}
