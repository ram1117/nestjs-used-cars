import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// const cookieSession = require('cookie-session')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(cookieSession({
  //   keys:['abxyzopyu']
  // }))
  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist:true          //strips any additional properties from request's body that are not in the DTO. for security concern
  // }))
  await app.listen(3001);
}
bootstrap();
