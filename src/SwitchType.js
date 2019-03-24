import React from "react";
import { NavItem } from "reactstrap";

class SwitchType extends React.Component {
    constructor() {
      super();
      this.state = { type: "now_playing", isActive: true };
    }
  
    handleClick(e) {
      this.props.switchType(e.target.value);
    }
    render() {
      return (
        <div className="d-flex justify-content-end">        
        <button className="btn btn-primary mr-2" value="now_playing" onClick={(e) => this.handleClick(e)}>
          Now playing
        </button>
        <button className="btn btn-info mx-3" value="top_rated" onClick={(e) => this.handleClick(e)}>
          Top rated
        </button>
      
        </div>
      );
    }
  }

  export default SwitchType;