import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './models/users/services/users/users.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
  const userService = app.get(UsersService)
  await userService.create_admin()
}
bootstrap();
