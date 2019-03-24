import React from "react";

class SearchByGenre extends React.Component {
    constructor() {
      super();
      this.state = { value: "all", genreId: -1 };
    }
  
    handleChange(e) {
      const { genres } = this.props;
      let index = genres.findIndex(genre => genre.name === e.target.value);
      let genreId;

      //if all genres is selected
      if (index === -1) {
        genreId = -1;
      } else {
        genreId = genres[index].id;
      }
      this.setState({ value: e.target.value, genreId: genreId }, () => 
      {console.log('1', this.state.genreId)
        this.props.bind(this.state.genreId);
      }
        
      );
    }
  
  reset () {
  this.setState({value: "all", genreId: -1 })

  }
  
    render() {
      const { genres } = this.props;
      return (
        <form onSubmit={e => e.preventDefault()}>
          <select
            className="form-control"
            value={this.state.value}     //option having this value will be displayed
            onChange={e => this.handleChange(e)}
          >
            <option value="all">All Genres</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.name} id={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </form>
      );
    }
  }
  
  export default SearchByGenre;