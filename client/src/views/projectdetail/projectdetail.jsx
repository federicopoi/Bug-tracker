import React from "react";
import { Row, Col } from "reactstrap";

import {
  AssignedPersonal,
  Detail,
  Tickets,
} from "../../components/projectdetail-components";

const ProjectDetail = (props) => {
  return (
    <div>
      <Row>
        <Col sm={6} lg={4}>
          <Detail props={props.location.state} />
          <AssignedPersonal props={props.location.state}></AssignedPersonal>
        </Col>
        <Col sm={6} lg={8}>
          <Tickets props={props.location.state}></Tickets>
        </Col>
      </Row>
    </div>
  );
};

export default ProjectDetail;
