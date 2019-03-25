import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import TrailerModal from "./TrailerModal";

import MovieInfo from "./MovieInfo";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";

class MoviesGoHere extends React.Component {
  render() {
    console.log(this.props.movies);
    const Imgbase = `https://image.tmdb.org/t/p/w200`;
    return (
      <Row>
        {this.props.movies.map(movie => (
          <Col md="3">
            <Card>
              <CardImg
                top
                width="100%"
                src={Imgbase + movie.poster_path}
                alt={movie.original_title}
              />
              <CardBody>
                <CardTitle>{movie.original_title}</CardTitle>
                <CardText>
                  <Link to="/movieinfo" overview={movie.overview}>Read more</Link>
                  <TrailerModal movieId = {movie.id} buttonLabel="Trailer"/>
                  <small className="text-muted d-block">
                    <strong>Rating: </strong>
                    {movie.vote_average}
                  </small>
                  <small className="text-muted d-block">
                    <strong>Release Date: </strong>
                    {movie.release_date}
                  </small>

                </CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
}

export default MoviesGoHere;
