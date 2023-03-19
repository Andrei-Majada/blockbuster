import { getDb } from '../migrations-utils/db';
import axios from 'axios';
import * as dotenv from 'dotenv' 
dotenv.config()

export const up = async () => {
  try {
    const db = await getDb();
    let collection = await db.collection('movies');
    let response = await axios.get(process.env.TMDB_URL);
    let movies = response.data.results;

    if (movies) {
      movies.forEach(async movie => {
        collection.insertOne({
          title: movie.title,
          description: movie.overview,
          rate: movie.vote_average/2,
          image_url: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie.poster_path,
          release_date: movie.release_date,
          isFavorite: false
        });
      });
    } else {
      await db.collection('movies').insertOne({
        title: 'Casamento Armado',
        description: 'Durante a cerimônia de casamento, Darcy e Tom estão reunidos com seus familiares para celebrar o grande momento, quando são surpreendidos por sequestradores. Agora, os noivos têm a missão de salvar as suas famílias do perigo, trazendo a lembrança de quando se apaixonaram um pelo outro.',
        rate: 3.15,
        image_url: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/i3OgPuen3vi7UkAQCMZou2NkPUm.jpg',
        release_date: '2022-12-28'
      });  
    }

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

// import { getDb } from '../migrations-utils/db';
// import axios from 'axios';
// import * as dotenv from 'dotenv' 
// dotenv.config()

// export const up = async () => {
//   try {
//    const db = await getDb();

//    let movies = await axios.get(process.env.TMDB_URL);

//    console.log('movies' + movies);

//    await db.collection('movies').insertOne({
//      title: 'Casamento Armado',
//      description: 'Durante a cerimônia de casamento, Darcy e Tom estão reunidos com seus familiares para celebrar o grande momento, quando são surpreendidos por sequestradores. Agora, os noivos têm a missão de salvar as suas famílias do perigo, trazendo a lembrança de quando se apaixonaram um pelo outro.',
//      rate: 3.15,
//      image_url: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/i3OgPuen3vi7UkAQCMZou2NkPUm.jpg',
//      release_date: '2022-12-28'
//    });

//  } catch (error) {
//    throw new Error(error);
//  }
// };