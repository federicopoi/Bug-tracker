import React, { Component } from "react";
import { createProject } from "../../../store/actions/projectActions";
import { clearErrors } from "../../../store/actions/errorActions";
import { connect } from "react-redux";
import { getUsers } from "../../../store/actions/usersActions";
import { getTeams } from "../../../store/actions/teamActions";

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
export class CreateProjectModal extends Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.getTeams();
  }
  state = {
    modal: false,
    name: "",
    manager: "",
    teams: {},
    submitters: {},
    msg: null,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for login error
      console.log(error.msg.msg);
      if (error.id === "CREATE_PROJECT_FAIL") {
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
    const { name, manager, teams, submitters } = this.state;

    // Create Project object
    const newProject = {
      name,
      manager,
      teams,
      submitters,
    };
    this.props.createProject(newProject);
    if ((teams && teams.length) || (submitters && submitters.length)) {
      this.toggle();
    }
  };
  render() {
    const { users } = this.props.users;
    const { teams } = this.props.teams;

    return (
      <div>
        <Button onClick={this.toggle} className="bg-success border-success">
          Create Project
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
                  placeholder="Project Name"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="manager">Project Manager</Label>
                <Input
                  type="select"
                  name="manager"
                  id="manager"
                  onChange={this.onChange}
                  className="mb-2"
                >
                  <option>Select Option</option>
                  {users &&
                    users
                      .filter(({ role }) => role === "Project Manager")
                      .map(({ name }) => {
                        return <option>{name}</option>;
                      })}
                </Input>
                <Label for="teams">Solving Teams</Label>
                <Input
                  onChange={this.onChangeMultiple}
                  type="select"
                  name="teams"
                  id="teams"
                  className="mb-2"
                  multiple
                >
                  {teams &&
                    teams.map(({ name }) => {
                      return <option>{name}</option>;
                    })}
                </Input>
                <Label for="submitters">Submitters</Label>
                <Input
                  onChange={this.onChangeMultiple}
                  type="select"
                  name="submitters"
                  id="submitters"
                  className="mb-2"
                  multiple
                >
                  {users &&
                    users
                      .filter(({ role }) => role === "Submitter")
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
  teams: state.teams,
});
export default connect(mapStateToProps, {
  createProject,
  clearErrors,
  getUsers,
  getTeams,
})(CreateProjectModal);
