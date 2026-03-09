import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

function Movie({id, posterPath, title, overview, genreIds}) {
  return (
    <div key={id}>
        <img
          src={posterPath}
          alt={title}
          style={{ maxWidth: "200px", height: "auto" }}
        />
        <h2><Link to={`/movie/${id}`}>{title}</Link></h2>
        <p>{overview}</p>
        <ul>
          {genreIds.map((genre) => (
            <li key={genre}>{genre}</li>
          ))}
        </ul>
      </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  posterPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  genreIds: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Movie;