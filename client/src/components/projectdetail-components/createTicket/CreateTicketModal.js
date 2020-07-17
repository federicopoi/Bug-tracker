import React, { Component } from "react";
import { createTicket } from "../../../store/actions/ticketsActions";
import { clearErrors } from "../../../store/actions/errorActions";
import { connect } from "react-redux";
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
export class CreateTicketModal extends Component {
  state = {
    modal: false,
    summary: "",
    description: "",
    priority: "",
    assignedTeam: "",
    project: this.props.name,
    submitter: this.props.user.name,
    type: "",
    msg: null,
  };

  componentDidMount() {
    this.props.getTeams();
  }

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
      summary,
      description,
      priority,
      assignedTeam,
      submitter,
      project,
      type,
    } = this.state;

    // Create usre object
    const newTicket = {
      summary,
      description,
      priority,
      assignedTeam,
      submitter,
      project,
      type,
    };
    this.props.createTicket(newTicket);
    if (
      summary === "" ||
      description === "" ||
      submitter === "" ||
      priority === "" ||
      assignedTeam === "" ||
      project === "" ||
      type === ""
    ) {
      console.log("Error");
    } else {
      this.toggle();
    }
  };
  render() {
    const { teams } = this.props.teams;
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
                <Label for="summary">Summary</Label>
                <Input
                  type="text"
                  name="summary"
                  id="summary"
                  placeholder="Summary"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="description">Description</Label>
                <Input
                  type="textarea"
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
                  Resolve Team
                </Label>
                <Input
                  type="select"
                  name="assignedTeam"
                  id="assignedTeam"
                  onChange={this.onChange}
                >
                  <option>Select Option</option>
                  {teams &&
                    teams.map(({ name, _id }) => {
                      return <option key={_id}>{name}</option>;
                    })}
                </Input>
                <Label className="mt-3">Type</Label>
                <Input
                  type="select"
                  name="type"
                  id="type"
                  className="mb-3"
                  onChange={this.onChange}
                >
                  <option>Select Option</option>
                  <option>Bug / Errors</option>
                  <option>Task</option>
                  <option>Feature</option>
                  <option>Usability Problem</option>
                  <option>Analysis</option>
                </Input>
                <Label for="exampleFile">Attach File</Label>
                <Input
                  type="file"
                  name="file"
                  id="file"
                  onChange={this.onChange}
                />
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
  teams: state.teams,
});
export default connect(mapStateToProps, {
  createTicket,
  clearErrors,
  getTeams,
})(CreateTicketModal);
