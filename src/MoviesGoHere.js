import React from "react";
import { Row, Col } from "reactstrap";
import { Link, BrowserRouter as Router } from 'react-router-dom'
import TrailerModal from "./TrailerModal";



import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";

class MoviesGoHere extends React.Component {
  render() {
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
                  <Link to={"/movieinfo/" + movie.id}>Read more</Link>
                  <TrailerModal movieId = {movie.id} title={movie.title} buttonLabel="Trailer"/>
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
