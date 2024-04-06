import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { PhysicalRooms } from './entities/physicalrooms.enity';
import { Members } from './entities/members.entity';
import { Meetings } from './entities/meetings.entity';
import { Guests } from './entities/guests.entity';
import { Reservations } from './entities/reservations.entity';
import { Reserveds } from './entities/reserveds.entity';
import { VirtualRooms } from './entities/virtualrooms.entity';
import { UsersModule } from './models/users/users.module';
import { VirtualroomsModule } from './models/virtualrooms/virtualrooms.module';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from './auth/auth.interceptor';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'Syatt',
      password: 'Senha123#',
      database: 'api',
      entities: [Users, PhysicalRooms, Members, Meetings, Guests, Reservations, Reserveds, VirtualRooms],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    VirtualroomsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: AuthInterceptor,
  }],
})
export class AppModule {}
