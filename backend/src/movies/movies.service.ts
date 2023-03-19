
import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-user.dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<MovieDocument>) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    try {
      const createdMovie = new this.movieModel(createMovieDto);
      return createdMovie.save();    
    } catch(error) {
      throw new HttpException(`Error creating movie. Error: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Movie[]> {
    try {
      let movies = this.movieModel.find().exec();

      if (!movies) {
        throw new HttpException(`No movie found in database.`, HttpStatus.NOT_FOUND);
      }
      
      return movies;
    } catch(error) {
      throw new HttpException(`Error searching movies. Error: ${error}`, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string): Promise<Movie | undefined> {
    try {
      let movie = this.movieModel.findOne({ _id: id }).exec();

      if (!movie) {
        throw new HttpException(`Movie not found with id: ${id}.`, HttpStatus.NOT_FOUND);
      }

      return movie;
    } catch(error) {
      throw new HttpException(`Error searching movie with id ${id}. Error: ${error}`, HttpStatus.NOT_FOUND);
    }
  }

  async findByTitle(title: string): Promise<Movie | undefined> {
    try {
      let movie = this.movieModel.findOne({ title }).exec();

      if (!movie) {
        throw new HttpException(`Movie not found with title: ${title}.`, HttpStatus.NOT_FOUND);
      }

      return movie;
    } catch(error) {
      throw new HttpException(`Error searching movie with title ${title}. Error: ${error}`, HttpStatus.NOT_FOUND);
    }
  }

  async updateOne(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie | undefined> {
    try {
        const movie = await this.movieModel.findOneAndUpdate({ _id: id }, updateMovieDto, {
          new: true,
        }); 

      if (!movie) {
        throw new HttpException(`Movie not found with id: ${id}.`, HttpStatus.NOT_FOUND);
      }

      return movie

    } catch(error) {
      throw new HttpException(`Error updating movie with id: ${id}. Error: ${error}`, HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: string) {
    try {
      let movie = await this.movieModel.findOne({ _id: id });

      return await this.movieModel.deleteOne({ _id: id });
    } catch(error) {
      throw new HttpException(`Error deleting movie with id ${id}. Error: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllFavorites(): Promise<Movie[]> {
    try {
      let movies = this.movieModel.find({ isFavorite: true }).exec();

      if (!movies) {
        throw new HttpException(`No movie found in database.`, HttpStatus.NOT_FOUND);
      }
      
      return movies;
    } catch(error) {
      throw new HttpException(`Error searching movies. Error: ${error}`, HttpStatus.NOT_FOUND);
    }
  }
}
