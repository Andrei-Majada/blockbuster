import { getDb } from '../migrations-utils/db';
import axios from 'axios';
import * as dotenv from 'dotenv' 
dotenv.config()

export const up = async () => {
  const db = await getDb();
  try {
   const db = await getDb();

   let response = await axios.get("https://api.themoviedb.org/3/movie/776835?language=pt-BR&api_key=2259034324e50dc912d81435025174d6");
   let movie = response.data;

   await db.collection('movies').insertOne({
      title: movie.title,
      description: movie.overview,
      rate: movie.vote_average/2,
      image_url: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie.poster_path,
      release_date: movie.release_date,
      isFavorite: true
    });

 } catch (error) {
   throw new Error(error);
 }
};

export const down = async () => {
  const db = await getDb();
  await db
  .collection('movies')
  .deleteMany();
};