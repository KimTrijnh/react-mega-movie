import React from 'react';

class MovieInfo extends React.Component {
    render() {
      const { params } = this.props.match
      return (
        <div>
          <h1>Movie Overview</h1>
          <p>{params.id}</p>
        </div>
      )
    }
  }

export default MovieInfo;