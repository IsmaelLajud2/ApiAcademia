import { NestFactory ,HttpAdapterHost} from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())

  const config= new DocumentBuilder()
    .setTitle('Median')
    .setDescription('Api para academia')
    .setVersion('0.4')
    .build();

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document)  ;

  const {httpAdapter} = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
