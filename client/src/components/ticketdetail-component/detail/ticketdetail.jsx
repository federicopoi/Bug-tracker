import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Input,
  Table,
  Button,
  Row,
  Col,
} from "reactstrap";
import moment from "moment";
export class TicketDetail extends Component {
  render() {
    const {
      status,
      priority,
      assignedDev,
      project,
      created,
      type,
    } = this.props.props;
    return (
      <div>
        <Card>
          <CardBody>
            <Row className="my-2">
              <Col sm={6}>
                <h5 className="font-16 font-medium">Status</h5>
                <h5 className="font-14 font-weight-normal">{status}</h5>
              </Col>
              <Col sm={6}>
                <h5 className="font-16 font-medium">Priority</h5>
                <h5 className="font-14 font-weight-normal">{priority}</h5>
              </Col>
            </Row>
            <Row className="my-2">
              <Col sm={6}>
                <h5 className="font-16 font-medium">Assigned Developer</h5>
                <h5 className="font-14 font-weight-normal">{assignedDev}</h5>
              </Col>
              <Col sm={6}>
                <h5 className="font-16 font-medium">Project</h5>
                <h5 className="font-14 font-weight-normal">{project}</h5>
              </Col>
            </Row>
            <Row className="my-2">
              <Col sm={6}>
                <h5 className="font-16 font-medium">Created</h5>
                <h5 className="font-14 font-weight-normal">
                  {moment(created).fromNow()}
                </h5>
              </Col>
              <Col sm={6}>
                <h5 className="font-16 font-medium">Type</h5>
                <h5 className="font-14 font-weight-normal">{type}</h5>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default TicketDetail;
