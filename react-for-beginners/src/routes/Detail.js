import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  
  useEffect(() => {
    const getMovie = async (id) => {
      const response = await fetch(`https://nomad-movies.nomadcoders.workers.dev/movies/${id}`);
      const json = await response.json();
      setMovie(json);
      setLoading(false);
    };

    getMovie(id);
  }, [id]);

  return (
    <div>
      <h1>Detail</h1>
      {loading ? (
        <>
          <stroing>Loading...</stroing>
          <Link to="/">Home</Link>
        </>      
        ) : (
        <>
          <Link to="/">Home</Link>
          <p/>
          <strong>{movie.title}</strong>
          <p>{movie.overview}</p>
          <p>장르: {Array.isArray(movie.genres) ? movie.genres.map((g) => g.name).join(", ") : ""}</p>
          <img src={movie.poster_path} alt={movie.title} style={{ maxWidth: "200px", height: "auto" }} />
          <p>개봉: {movie.release_date}</p>
          <p>상영시간: {movie.runtime}분</p>
          <p>평점: {movie.vote_average} (투표 {movie.vote_count}개)</p>
        </>
      )}
    </div>
  );
}

export default Detail;  