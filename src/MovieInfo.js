import React from 'react';

class MovieInfo extends React.Component {
constructor() {
  super();
  this.state = {isLoading: true, movie : {}}
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
      movie : data
    });
  });
}

    render() {
    //why can not use this.props.match.id directly ex.console.log(this.props.match.id) result undefined
   // at first, the component have no prop obj => undefined, using const { params } to create a prop obj then it can be accessed
      // const { params } = this.props.match
      // console.log(params.id)
      
      const { movie, isLoading } = this.state;
      const Imgbase = `https://image.tmdb.org/t/p/w500`;
      
       return (
         
        <div className="container bg bg-dark text-light">
          <h1>Movie Overview</h1>
        {isLoading ? <div>Loading...</div> : 
 
          (<div>
            <h1>{movie.original_title}</h1>
          <div>
          <div>
          <img scr={Imgbase + movie.poster_path} alt={movie.original_title}/>
          <h1>
          <strong>{Imgbase + movie.poster_path}</strong> 
           {/* {movie.genres.map(genre => <span>genre.name</span>)} */}
          </h1>
          </div>
            <div>
            <h2>Overview</h2>
            <p>{movie.overview}</p>
            </div>
          </div>
          </div>)
        }


          
        </div>
      )
    }
  }

export default MovieInfo;