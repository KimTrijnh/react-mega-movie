import React from "react";

class SearchByTerm extends React.Component {
    constructor() {
      super();
      this.state = {value : ''};
    }
  
    handleChange(e) {
      this.setState({value: e.target.value}, () => this.props.bind(this.state.value))
    }

    reset () {
        this.setState({value: ''})
    }
  //() => this.props.termFilter(this.state.value)
    render() {
      return (
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            id="search-input"
            type="search"
            className="form-control"
            placeHolder="Search..."
            value={this.state.value}
            onChange={(e) => this.handleChange(e)}
          />
        </form>
      );
    }
  }

  export default SearchByTerm;