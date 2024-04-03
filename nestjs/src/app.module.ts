import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { PhysicalRoom } from './entity/physicalroom.enity';
import { Integrantes } from './entity/integrantes.entity';
import { Meetings } from './entity/meetings.entity';
import { Guests } from './entity/guests.entity';
import { Reservations } from './entity/reservations.entity';
import { Reserved } from './entity/reserved.entity';
import { VirtualRoom } from './entity/virtualroom.entity';


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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
