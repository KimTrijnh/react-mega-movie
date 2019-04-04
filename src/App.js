import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import PaginationComponent from "react-reactstrap-pagination";
import "./App.css";
import Sliders from "./Sliders";
import genresData from "./GenresData.json";
import MoviesGoHere from "./MoviesGoHere";
import SwitchType from "./SwitchType";
import SearchByTerm from "./SearchByTerm";
import SearchByGenre from "./SearchByGenre";


class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      fullMovies: [],
      displayedMovies: [],
      genresData: genresData.genres,
      selectedPage: 1,
      id: -1,
      term: "",
      valueR: { minR: 0, maxR: 10 },
      valueY: { minY: 1900, maxY: 2019 },
      title: "NOW PLAYING",
      highestRateChecked: false
    };

    this.switchType = this.switchType.bind(this);
    this.genreElement = React.createRef();
    this.termElement = React.createRef();
    this.slidersElement = React.createRef();
    this.higestRatingElement = React.createRef();
  }

  bindId = id => {
    this.setState({ id: id }, () => this.updateChange());
  };

  bindTerm = term => {
    this.setState({ term: term }, () => this.updateChange());
  };

  bindRating = (min, max) => {
    this.setState({ valueR: { minR: min, maxR: max } }, () =>
      this.updateChange()
    );
  };

  bindYear = (min, max) => {
    this.setState({ valueY: { minY: min, maxY: max } }, () =>
      this.updateChange()
    );
  };
  bindHighestRating = isChecked => {
    this.setState({ highestRateChecked: isChecked }, () => this.updateChange());
  };

  updateChange() {
    const { id, term, valueR, valueY, highestRateChecked } = this.state;
    console.log("4", id, term, valueR, valueY, this.state.fullMovies);
    let displayedMovies;

    if (id === -1) {
      displayedMovies = this.state.fullMovies;
    } else {
      displayedMovies = this.state.fullMovies.filter(
        movie => movie.genre_ids.indexOf(id) !== -1
      );
    }
    //filter rating
    displayedMovies = displayedMovies.filter(
      movie =>
        valueR.minR <= movie.vote_average && movie.vote_average <= valueR.maxR
    );

    //filter year
    displayedMovies = displayedMovies.filter(
      movie =>
        valueY.minY <= Number(movie.release_date.slice(0, 4)) &&
        Number(movie.release_date.slice(0, 4)) <= valueY.maxY
    );

    //filter by term
    displayedMovies = displayedMovies.filter(
      movie => movie.title.toLowerCase().indexOf(term.toLowerCase()) !== -1
    );

    //sort or not sort (rating)
    if (highestRateChecked) {
      displayedMovies.sort((a, b) => b.vote_average - a.vote_average);
    }

    this.setState({ displayedMovies: displayedMovies });
  }

  componentDidMount() {
    const API_KEY = "f55e42fa6f08a80dc89685d49eab586d";
    const MoviesUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${
      this.state.selectedPage
    }`;

    fetch(MoviesUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoading: false,
          fullMovies: data.results,
          displayedMovies: data.results,
          totalItems: data.total_results
        });
      });
  }

  switchType = type => {
    const API_KEY = "f55e42fa6f08a80dc89685d49eab586d";
    const MoviesUrl = `https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}&page=${
      this.state.selectedPage
    }`;
    fetch(MoviesUrl)
      .then(response => response.json())
      .then(data =>
        this.setState({
          fullMovies: data.results,
          displayedMovies: data.results,
          totalItems: data.total_results,
          title: type.replace("_", " ").toUpperCase()
        })
      );

    //reset all genreSelect, sliders
    this.genreElement.current.reset();
    this.termElement.current.reset();
    this.slidersElement.current.reset();
    this.higestRatingElement.current.reset();

  };

  handleSelected(selectedPage) {
    //for the pagination
    console.log("selected", selectedPage);
    this.setState({ selectedPage: selectedPage }, () => this.switchPage());
  }

  switchPage() {
    const API_KEY = "f55e42fa6f08a80dc89685d49eab586d";
    const MoviesUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${
      this.state.selectedPage
    }`;

    fetch(MoviesUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoading: false,
          fullMovies: data.results,
          displayedMovies: data.results
        });
      });

    //reset all genre select, sliders, term search
    this.genreElement.current.reset();
    this.termElement.current.reset();
    this.slidersElement.current.reset();
    this.higestRatingElement.current.reset();
    }

  render() {
    const { isLoading, displayedMovies, genresData, title } = this.state;
    return (
      <div className="App py-4">
        <header className="text-center py-4">
          <h1> Hello</h1>
          {/* <img src="./megaman.png" width="64px" alt="popcorn"/> */}
          <p className="lead">{title}</p>
        </header>
        <div className="container-fluid">
          <Row>
            <Col md="3">
              <SwitchType switchType={this.switchType} />
              <HighestRating 
              ref={this.higestRatingElement}
              bind={this.bindHighestRating}
              update={this.updateChange} />
              <SearchByGenre
                ref={this.genreElement}
                genres={genresData}
                update={this.updateChange}
                bind={this.bindId}
              />
              <SearchByTerm
                ref={this.termElement}
                bind={this.bindTerm}
                update={this.updateChange}
              />
              <Sliders
                ref={this.slidersElement}
                bindR={this.bindRating}
                bindY={this.bindYear}
                update={this.updateChange}
              />
            </Col>

            <Col md="9">
              {isLoading ? (
                <h1 className="text-center">No Movie! </h1>
              ) : (
                <MoviesGoHere movies={displayedMovies} />
              )}
            </Col>
          </Row>
        </div>
        <footer className="py-5">
          <PaginationComponent
            className="pagination"
            totalItems={979}
            pageSize={20}
            onSelect={e => this.handleSelected(e)}
          />
        </footer>
      </div>
    );
  }
}

class HighestRating extends React.Component {
  constructor() {
    super();
    this.state = { isChecked: false };
  }

  handleCheck = e => {
    this.setState({ isChecked: e.target.checked }, () =>
      this.props.bind(this.state.isChecked)
    );
  };

  reset () {
    this.setState({isChecked: false}, () => document.getElementById("checkbox").checked = false )
}
  render() {
    return (
      <div className="d-flex justify-content-end p-3">
        <input
         id="checkbox"
          type="checkbox"
          onChange={e => this.handleCheck(e)}
        />
        <span className="badge badge-warning">Highest Ratings</span>
      </div>
    );
  }
}
export default App;
