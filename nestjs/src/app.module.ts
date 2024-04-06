import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PhysicalRoom } from './entities/physicalroom.enity';
import { Integrantes } from './entities/integrantes.entity';
import { Meetings } from './entities/meetings.entity';
import { Guests } from './entities/guests.entity';
import { Reservations } from './entities/reservations.entity';
import { Reserved } from './entities/reserved.entity';
import { VirtualRoom } from './entities/virtualroom.entity';
import { UsersModule } from './models/users/users.module';
import { VirtualroomsModule } from './models/virtualrooms/virtualrooms.module';
import { ReservationsModule } from './models/reservations/reservations.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'Syatt',
      password: 'Senha123#',
      database: 'api',
      entities: [User, PhysicalRoom, Integrantes, Meetings, Guests, Reservations, Reserved, VirtualRoom],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    VirtualroomsModule,
    ReservationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
