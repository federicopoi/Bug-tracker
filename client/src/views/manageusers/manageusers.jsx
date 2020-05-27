import React from "react";
import { Row, Col } from "reactstrap";
import { UsersList, ManageUsers } from "../../components/manageusers-component";

const ManageUsersView = () => {
  return (
    <div>
      <Row>
        <Col sm={4} lg={4}>
          <ManageUsers></ManageUsers>
        </Col>
        <Col sm={8} lg={8}>
          <UsersList></UsersList>
        </Col>
      </Row>
    </div>
  );
};
export default ManageUsersView;
