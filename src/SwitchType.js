import React from "react";
import { NavItem } from "reactstrap";

class SwitchType extends React.Component {
    constructor() {
      super();
      this.state = { type: "now_playing", isActive: true };
    }
  
    handleClick(e) {
    console.log("han", e.target.value);
      this.props.switchType(e.target.value);
    }
    render() {
      return (
        <div className="d-flex">
          <NavItem>
          <button className="btn btn-success" value="now_playing" onClick={(e) => this.handleClick(e)}>
          Now playing
        </button>
        <button className="btn btn-info" value="top_rated" onClick={(e) => this.handleClick(e)}>
          Top rated
        </button>
          </NavItem>
        </div>
      );
    }
  }

  export default SwitchType;