import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config= new DocumentBuilder()
    .setTitle('Median')
    .setDescription('Api para academia')
    .setVersion('0.2')
    .build();

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document)  ;

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
