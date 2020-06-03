import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Input,
  Table,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import { getUsers } from "../../../store/actions/usersActions";

export class ManageUsersList extends Component {
  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    const { users } = this.props.users;

    return (
      <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <div className="">
              <CardTitle>Your Staff</CardTitle>
              <CardSubtitle>All users in your database</CardSubtitle>
            </div>
          </div>
          <Table className="no-wrap v-middle" responsive>
            <thead>
              <tr className="border-0">
                <th className="border-0">Username</th>
                <th className="border-0">Email</th>
                <th className="border-0">Role</th>
              </tr>
            </thead>
            {users &&
              users
                .filter(({ name }) => name !== this.props.user.name)
                .map(({ name, email, role, _id }) => {
                  return (
                    <tbody key={_id}>
                      <tr>
                        <td>
                          <div className="d-flex no-block align-items-center">
                            <div className="">
                              <h5 className="mb-0 font-16 font-medium">
                                {name}
                              </h5>
                            </div>
                          </div>
                        </td>

                        <td>{email}</td>
                        <td>{role}</td>
                      </tr>
                    </tbody>
                  );
                })}
          </Table>
        </CardBody>
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.users,
    user: state.auth.user,
  };
};
export default connect(mapStateToProps, { getUsers })(ManageUsersList);
