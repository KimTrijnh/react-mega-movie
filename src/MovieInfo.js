import React from "react";
import { Link } from "react-router-dom";
class MovieInfo extends React.Component {
  constructor() {
    super();
    this.state = { isLoading: true, movie: {} };
  }

  componentDidMount() {
    const { params } = this.props.match;
    const API_KEY = "f55e42fa6f08a80dc89685d49eab586d";
    const movieId = params.id;
    const MoviesUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    fetch(MoviesUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoading: false,
          movie: data
        });
      })
      .catch(err => alert(err));
  }

  render() {
    //why can not use this.props.match.id directly ex.console.log(this.props.match.id) result undefined
    // at first, the component have no prop obj => undefined, using const { params } to create a prop obj then it can be accessed
    // const { params } = this.props.match
    // console.log(params.id)

    const { movie, isLoading } = this.state;
    const Imgbase = `https://image.tmdb.org/t/p/w500`;
    const imgUrl = Imgbase + movie.poster_path;
    return (
      <div style={{ background: `url(${imgUrl})`}}>
        <div
          className="container bg bg-dark text-light py-4"
          style={{ boxShadow: "5px 5px 5px gray" }}
        >
          <div>
            <Link to="/"> Back to Home</Link>

            <h1 className="text-center">Movie Overview</h1>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <div className="py-3 pl-2">
                <h3>{movie.original_title}</h3>
                <span className="text-muted">{movie.release_date}</span>
                <div className="row">
                  <div className="col-sm-12 col-md-4 text-center my-3">
                    <img
                      src={imgUrl}
                      alt={movie.original_title}
                      style={{ width: "93%" }}
                    />
                  </div>
                  <div className="col-sm-12 col-md-8 px-4 ">
                    <div>
                      {movie.genres.map(genre => (
                        <span className="badge badge-primary m-2">
                          {genre.name}
                        </span>
                      ))}
                    </div>

                    <h2>Overview</h2>
                    <p>{movie.overview}</p>
                    <a href={movie.homepage} target="blank">
                      <button className="btn btn-primary">
                        Go to its homepage
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieInfo;
