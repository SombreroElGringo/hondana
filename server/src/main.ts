import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApplicationModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { retryAttempts: 5, retryDelay: 3000 },
  });


  const options = new DocumentBuilder()
    .setTitle('SNCF-Live API')
    .setDescription('The SNCF-Live API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1/docs', app, document);

  await app.startAllMicroservicesAsync();
  await app.listen(3001);
}

bootstrap();
