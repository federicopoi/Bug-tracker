import React, { Component } from "react";
import { createTeam } from "../../../store/actions/teamActions";
import { clearErrors } from "../../../store/actions/errorActions";
import { connect } from "react-redux";
import { getUsers } from "../../../store/actions/usersActions";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  FormGroup,
  Alert,
} from "reactstrap";
export class CreateTeamModal extends Component {
  componentDidMount() {
    this.props.getUsers();
  }
  state = {
    modal: false,
    name: "",
    manager: "",
    updaters: {},
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for login error
      console.log(error.msg.msg);
      if (error.id === "CREATE_TEAM_FAIL") {
        this.setState({
          msg: error.msg.msg,
        });
      } else {
        this.setState({
          msg: null,
        });
      }
    }
  }
  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal,
    });
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onChangeMultiple = (e) => {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({ [e.target.name]: value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { name, manager, updaters } = this.state;

    // Create Team object
    const newTeam = {
      name,
      manager,
      updaters,
    };
    this.props.createTeam(newTeam);
    if (name === "" || manager === "") {
      console.log("Error");
    } else {
      this.toggle();
    }
  };
  render() {
    const { users } = this.props.users;
    return (
      <div>
        <Button onClick={this.toggle} className="bg-success border-success">
          Create Team
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Create Project</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Team Name"
                  className="mb-3"
                  onChange={this.onChange}
                />

                <Label for="text">Team Manager</Label>
                <Input
                  type="select"
                  name="manager"
                  id="manager"
                  placeholder="Team Manager"
                  className="mb-3"
                  onChange={this.onChange}
                >
                  <option>Select Option</option>
                  {users &&
                    users
                      .filter(({ role }) => role === "Team Manager")
                      .map(({ name }) => {
                        return <option>{name}</option>;
                      })}
                </Input>

                <Label for="submitters">Updaters</Label>
                <Input
                  onChange={this.onChangeMultiple}
                  type="select"
                  name="updaters"
                  id="updaters"
                  className="mb-2"
                  multiple
                >
                  {users &&
                    users
                      .filter(({ role }) => role === "Updater")
                      .map(({ name }) => {
                        return <option>{name}</option>;
                      })}
                </Input>

                {this.state.msg ? (
                  <Alert color="danger" className="mt-3">
                    {this.state.msg}
                  </Alert>
                ) : null}
                <Button color="dark" block style={{ marginTop: "2rem" }}>
                  Submit
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  error: state.error,
  users: state.users,
});
export default connect(mapStateToProps, {
  createTeam,
  clearErrors,
  getUsers,
})(CreateTeamModal);
