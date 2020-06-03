import React from "react";
import { Row, Col } from "reactstrap";
import {
  ManageUsersList,
  ManageUsers,
} from "../../components/manageusers-component";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
const ManageUsersView = (props) => {
  const { role } = props.user;
  if (role !== "Admin") return <Redirect to="/" />;
  return (
    <div>
      <Row>
        <Col sm={4} lg={4}>
          <ManageUsers></ManageUsers>
        </Col>
        <Col sm={8} lg={8}>
          <ManageUsersList></ManageUsersList>
        </Col>
      </Row>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(ManageUsersView);
