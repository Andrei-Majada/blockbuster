import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesModule } from './movies/movies.module';
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/blockbuster';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL), 
    MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
