// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
  
//   // Добавьте CORS
//   app.enableCors({
//     origin: 'http://localhost:3000', // или ваш фронтенд URL
//     credentials: true,
//   });
  
//   await app.listen(3001);
// }
// bootstrap();



import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Добавьте эти строки
  app.enableCors({
    // origin: 'http://localhost:3001', // или true для разрешения всех доменов
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();