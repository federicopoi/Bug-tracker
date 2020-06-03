import React from "react";
import { Row, Col } from "reactstrap";

import {
  TicketDetail,
  TextDetail,
  TicketsComments,
  TicketHistory,
  TicketAttachments,
} from "../../components/ticketdetail-component";

const ProjectDetail = (props) => {
  const {
    match: { params },
  } = props;

  return (
    <div>
      <Row>
        <Col sm={12} lg={12}>
          <TextDetail props={props.location.state}></TextDetail>
        </Col>
        <Col sm={6} lg={5}>
          <TicketDetail props={props.location.state}></TicketDetail>
          <TicketHistory props={props.location.state}></TicketHistory>
        </Col>
        <Col sm={6} lg={7}>
          <TicketsComments props={props.location.state}></TicketsComments>
          <TicketAttachments props={props.location.state}></TicketAttachments>
        </Col>
      </Row>
    </div>
  );
};

export default ProjectDetail;
