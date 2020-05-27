import React, { Component } from "react";
import { createProject } from "../../../store/actions/projectActions";
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
export class CreateProjectModal extends Component {
  componentDidMount() {
    this.props.getUsers();
  }
  state = {
    modal: false,
    title: "",
    description: "",
    personal: {},
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
    this.setState({ personal: value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { title, description, personal } = this.state;

    // Create usre object
    const newProject = {
      title,
      description,
      personal,
    };
    this.props.createProject(newProject);
    if (title === "" || description === "") {
      console.log("Error");
    } else {
      this.toggle();
    }
  };
  render() {
    const { users } = this.props.users;
    console.log(this.props);
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
                <Label for="name">Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="email">Description</Label>
                <Input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Description"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="personal">Select Personal</Label>
                <Input
                  onChange={this.onChangeMultiple}
                  type="select"
                  name="personal"
                  id="personal"
                  multiple
                >
                  {users &&
                    users.map(({ name }) => {
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
  createProject,
  clearErrors,
  getUsers,
})(CreateProjectModal);
