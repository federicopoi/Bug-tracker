import React from "react";
import { Row, Col } from "reactstrap";

import {
  TicketDetail,
  TextDetail,
  TicketsComments,
  QrCode,
} from "../../components/ticketdetail-component";

const ProjectDetail = (props) => {
  const {
    match: { params },
  } = props;

  return (
    <div>
      <Row>
        <Col sm={6} lg={5}>
          <TextDetail props={props.location.state}></TextDetail>
          <TicketDetail props={props.location.state}></TicketDetail>
        </Col>
        <Col sm={6} lg={7}>
          <TicketsComments props={props.location.state}></TicketsComments>
        </Col>
      </Row>
    </div>
  );
};

export default ProjectDetail;
