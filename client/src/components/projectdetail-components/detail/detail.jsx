import React, { Component } from "react";
import { Input, Label, Button, Card } from "reactstrap";

export class Detail extends Component {
  render() {
    const { title, description } = this.props.props;
    return (
      <div>
        <h2 className="mb-3">{title}</h2>
        <div className="ml-auto d-flex no-block align-items-center mb-3">
          <div className="dl">
            <h5 className="font-weight-normal">{description}</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
