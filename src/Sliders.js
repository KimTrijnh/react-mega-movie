import React, { Component } from "react";
import ReactDOM from "react-dom";
import InputRange from "react-input-range";
import "./Sliders.css";
import "react-input-range/lib/css/index.css";

class Sliders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value1: {
        min: 0,
        max: 10
      },
      value2: {
        min: 1900,
        max: 2019
      }
    };
  }

  ratingFilter = e => {
    const min = e.min;
    const max = e.max;
    this.props.bindR(min, max);
  };

  yearFilter = e => {
    const min = e.min;
    const max = e.max;
    this.props.bindY(min, max);
  };

  reset() {
    this.setState({
      value1: {
        min: 0,
        max: 10
      },
      value2: {
        min: 1900,
        max: 2019
      }
    });
  }

  render() {
    return (
      <form className="form">
        <label>Rating: </label>
        <InputRange
          draggableTrack
          maxValue={10}
          minValue={0}
          onChange={value => this.setState({ value1: value })}
          onChangeComplete={e => this.ratingFilter(e)}
          value={this.state.value1}
        />
        <label>Year: </label>
        <InputRange
          draggableTrack
          maxValue={2019}
          minValue={1900}
          onChange={value => this.setState({ value2: value })}
          onChangeComplete={e => this.yearFilter(e)}
          value={this.state.value2}
        />
      </form>
    );
  }
}

export default Sliders;
