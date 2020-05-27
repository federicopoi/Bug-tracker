import React, { Component } from "react";
import { createTicket } from "../../../store/actions/ticketsActions";
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
export class CreateTicketModal extends Component {
  componentDidMount() {
    this.props.getUsers();
  }
  state = {
    modal: false,
    title: "",
    description: "",
    status: "",
    priority: "",
    assignedDev: "",
    project: this.props.title,
    type: "",
    msg: null,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for login error
      console.log(error.msg.msg);
      if (error.id === "CREATE_TICKET_FAIL") {
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
    if (e.target.value !== "Select Option") {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  onSubmit = (e) => {
    e.preventDefault();
    const {
      title,
      description,
      priority,
      assignedDev,
      project,
      type,
    } = this.state;

    // Create usre object
    const newTicket = {
      title,
      description,
      priority,
      assignedDev,
      project,
      type,
    };
    this.props.createTicket(newTicket);
    if (
      title === "" ||
      description === "" ||
      priority === "" ||
      assignedDev === "" ||
      project === "" ||
      type === ""
    ) {
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
          Create Ticket
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Create Ticket</ModalHeader>
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

                <Label className="mt-1">Priority</Label>
                <Input
                  type="select"
                  name="priority"
                  id="priority"
                  onChange={this.onChange}
                >
                  <option>Select Option</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Urgent</option>
                </Input>
                <Label for="exampleSelect" className="mt-3">
                  Assigned Developer
                </Label>
                <Input
                  type="select"
                  name="assignedDev"
                  id="assignedDev"
                  onChange={this.onChange}
                >
                  ><option>Select Option</option>
                  {users &&
                    users.map(({ name, _id }) => {
                      return <option key={_id}>{name}</option>;
                    })}
                </Input>
                <Label className="mt-3">Type</Label>
                <Input
                  type="select"
                  name="type"
                  id="type"
                  onChange={this.onChange}
                >
                  <option>Select Option</option>
                  <option>Bug / Errors</option>
                  <option>Task</option>
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
  createTicket,
  clearErrors,
  getUsers,
})(CreateTicketModal);
