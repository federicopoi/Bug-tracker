import React from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import {
  AssignedStaff,
  Detail,
  Tickets,
  UnassignTickets,
} from "../../components/teamdetai-component";

const TeamDetail = (props) => {
  const { name, role, email } = props.user;

  return (
    <div>
      <Row>
        <Col sm={6} lg={4}>
          <Detail props={props.location.state} />
          <AssignedStaff props={props.location.state}></AssignedStaff>
        </Col>
        <Col sm={6} lg={8}>
          <UnassignTickets props={props.location.state}></UnassignTickets>
          <Tickets props={props.location.state}></Tickets>
        </Col>
      </Row>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(TeamDetail);
