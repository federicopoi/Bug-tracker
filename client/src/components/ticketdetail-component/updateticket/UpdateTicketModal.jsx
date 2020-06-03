import React, { Component } from "react";
import { updateTicket } from "../../../store/actions/ticketsActions";
import { clearErrors } from "../../../store/actions/errorActions";
import { connect } from "react-redux";

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
export class UpdateTicketModal extends Component {
  state = {
    modal: false,
    summary: this.props.summary,
    description: this.props.description,
    priority: this.props.priority,
    status: this.props.status,
    msg: null,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for login error
      console.log(error.msg.msg);
      if (error.id === "UPDATE_TICKET_FAIL") {
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
    const { summary, description, priority, status } = this.state;

    // Create usre object
    const updatedTicket = {
      summary,
      description,
      priority,
      status,
    };
    this.props.updateTicket(updatedTicket);
    if (
      summary === "" ||
      description === "" ||
      priority === "" ||
      status === ""
    ) {
      console.log("Error");
    } else {
      this.toggle();
    }
  };
  render() {
    return (
      <div>
        <Button onClick={this.toggle} className="bg-success border-success">
          Update Ticket
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Create Ticket</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  placeholder="Description"
                  className="mb-3"
                  defaultValue={this.props.description}
                  onChange={this.onChange}
                />
                <Label className="mt-1">Priority</Label>
                <Input
                  type="select"
                  name="priority"
                  id="priority"
                  defaultValue={this.props.priority}
                  onChange={this.onChange}
                >
                  <option>Select Option</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Urgent</option>
                </Input>

                <Label className="mt-3">Status</Label>
                <Input
                  type="select"
                  name="status"
                  id="status"
                  defaultValue={this.props.status}
                  className="mb-3"
                  onChange={this.onChange}
                >
                  <option>Select Option</option>
                  <option>In progress</option>
                  <option>Closed</option>
                  <option>Reopened</option>
                  <option>Cancelled</option>
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
  user: state.auth.user,
});
export default connect(mapStateToProps, {
  updateTicket,
  clearErrors,
})(UpdateTicketModal);
