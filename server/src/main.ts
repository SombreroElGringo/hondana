import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { ApplicationModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { retryAttempts: 5, retryDelay: 3000 },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(3001);
}

bootstrap();
