import { Module, ValidationPipe } from '@nestjs/common';
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
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AuthInterceptor } from './auth/auth.interceptor';
import { Presence } from './entities/presence.entity';
import { PhysicalroomsModule } from './models/physicalrooms/physicalrooms.module';
import { MeetingsModule } from './models/meetings/meetings.module';
import { GuestsModule } from './models/guests/guests.module';
import { MailerModule } from './mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
import { ZoomModule } from './zoom/zoom.module';
import { DocxModule } from './docx/docx.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'api',
      entities: [Users, PhysicalRooms, Participate, Meetings, Guests, Reservations, VirtualRooms, Presence],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    VirtualroomsModule,
    ReservationsModule,
    AuthModule,
    MeetingsModule,
    PhysicalroomsModule,
    GuestsModule,
    MailerModule,
    ZoomModule,
    DocxModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: AuthInterceptor,
  },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    }],
})
export class AppModule { }
