import { useState, useEffect } from 'react';
import Movie from '../components/Movie';

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const response = await fetch("https://nomad-movies.nomadcoders.workers.dev/movies");
    const json = await response.json();
    setMovies(json);
    setLoading(false);
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      {loading ? <strong>Loading...</strong> : movies.map((movie) => (
        <Movie key={movie.id} id={movie.id} posterPath={movie.poster_path} title={movie.title} overview={movie.overview} genreIds={movie.genre_ids} />
      ))}
    </div>
  );
}

export default Home;