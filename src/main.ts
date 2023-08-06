import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const port = +configService.get<string>('http.port');

  await app.listen(port);
  console.log(`\r\n===== Warehouse API started: http://localhost:${port}\r\n`);
}
bootstrap();
