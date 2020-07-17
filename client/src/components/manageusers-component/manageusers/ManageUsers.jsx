import React, { Component } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { connect } from "react-redux";
import { getUsers, updateUsersRole } from "../../../store/actions/usersActions";

export class ManageUsers extends Component {
  componentDidMount() {
    this.props.getUsers();
  }
  state = {
    name: "",
    role: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      role: this.state.role,
    };
    if (this.state.role != "Select Role") this.props.updateUsersRole(newUser);
  };
  render() {
    const { users } = this.props.users;

    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <h2>Manage Users</h2>

          <FormGroup>
            <Label for="exampleSelect" className="mt-3">
              Select User
            </Label>
            <Input type="select" name="name" id="name" onChange={this.onChange}>
              <option>Select Option</option>
              {users &&
                users
                  .filter(
                    ({ name, email }) =>
                      name !== this.props.user.name &&
                      email !== "submitterdemo@gmail.com" &&
                      email !== "updaterdemo@gmail.com" &&
                      email !== "teammandemo@gmail.com" &&
                      email !== "prjmandemo@gmail.com"
                  )
                  .map(({ name, _id }) => {
                    return <option key={_id}>{name}</option>;
                  })}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="exampleSelect" className="mt-1">
              Select role to assign
            </Label>
            <Input type="select" name="role" id="role" onChange={this.onChange}>
              <option>Select Option</option>
              <option>Admin</option>
              <option>Project Manager</option>
              <option>Team Manager</option>
              <option>Updater</option>
              <option>Submitter</option>
            </Input>
          </FormGroup>
          <Button className="bg-success border-success mt-2">Submit</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    user: state.auth.user,
  };
};
export default connect(mapStateToProps, { getUsers, updateUsersRole })(
  ManageUsers
);
