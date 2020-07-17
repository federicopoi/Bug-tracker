import React from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import {
  AssignedPersonal,
  Detail,
  Tickets,
  ClosedTickets,
} from "../../components/projectdetail-components";

const ProjectDetail = (props) => {
  const { name, role, email } = props.user;
  if (role === "Admin" || role === "Project Manager") {
    return (
      <div>
        <Row>
          <Col sm={6} lg={4}>
            <Detail props={props.location.state} />
            <AssignedPersonal props={props.location.state}></AssignedPersonal>
          </Col>
          <Col sm={6} lg={8}>
            <Tickets props={props.location.state}></Tickets>
            <ClosedTickets props={props.location.state}></ClosedTickets>
          </Col>
        </Row>
      </div>
    );
  } else {
    return (
      <div>
        <Tickets props={props.location.state}></Tickets>
      </div>
    );
  }
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(ProjectDetail);
