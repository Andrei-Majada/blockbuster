import { Body, Controller, Delete, Get, Headers, HttpCode, Param, Post, Put, Req } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-user.dto';
import { Movie } from './movie.schema';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }
  
  @Get('/favorites')
  findAllFavorites(): Promise<Movie[]> {
    return this.moviesService.findAllFavorites();
  }

  @Get('/search')
  findByTitle(@Headers('title') title: string): Promise<Movie> {
    return this.moviesService.findByTitle(title);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) : Promise<Movie | undefined> {
    return this.moviesService.updateOne(id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.delete(id);
  }
}
