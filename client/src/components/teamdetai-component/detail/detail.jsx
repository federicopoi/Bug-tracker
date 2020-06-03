import React, { Component } from "react";
import { Input, Label, Button, Card, CardBody } from "reactstrap";
import moment from "moment";
export class Detail extends Component {
  render() {
    const { name, created } = this.props.props;
    return (
      <div>
        <h2 className="mb-3">{name}</h2>
        <div className="ml-auto d-flex no-block align-items-center mb-3">
          <div className="dl">
            <h5 className="font-weight-normal">
              {moment(created).format("lll")}
            </h5>
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
