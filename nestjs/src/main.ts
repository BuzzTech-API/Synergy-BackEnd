import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/services/users/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const userService = app.get(UsersService)
  await userService.create_admin()
  await app.listen(5000);
}
bootstrap();
