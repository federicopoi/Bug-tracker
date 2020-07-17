import React, { Component } from "react";
import { deriveTicket } from "../../../store/actions/ticketsActions";
import { clearErrors } from "../../../store/actions/errorActions";
import { connect } from "react-redux";
import { getTickets } from "../../../store/actions/ticketsActions";
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
export class DeriveTicketModal extends Component {
  componentDidMount() {
    this.props.getTeams();
    this.props.getTickets();
  }
  state = {
    modal: false,
    summary: this.props.summary,
    assignedTeam: "",
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for login error
      console.log(error.msg.msg);
      if (error.id === "DERIVE_TICKET_FAIL") {
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
  onSubmit = (e) => {
    e.preventDefault();
    const { summary, assignedTeam } = this.state;

    // Create Project object
    const updatedTicket = {
      summary,
      assignedTeam,
      oldTeam: this.props.name,
    };
    this.props.deriveTicket(updatedTicket);
    if (assignedTeam !== "") {
      this.toggle();
    }
  };
  render() {
    const { teams } = this.props.teams;
    const { tickets } = this.props.tickets;
    const projectName =
      tickets &&
      tickets.filter(({ assignedTeam }) => assignedTeam === this.props.name);

    const assignedTeams =
      tickets &&
      tickets
        .filter(({ project }) => project === projectName[0].project)
        .map(({ assignedTeam }) => assignedTeam);

    const uniqueNames = Array.from(new Set(assignedTeams));

    return (
      <div>
        <Button onClick={this.toggle}>Derive Ticket</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Derive ticket</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="exampleSelect" className="mt-3">
                  Select Team to derive
                </Label>
                <Input
                  type="select"
                  name="assignedTeam"
                  id="assignedTeam"
                  onChange={this.onChange}
                >
                  <option>Select Option</option>
                  {uniqueNames &&
                    uniqueNames
                      .filter((item) => item !== this.props.name)
                      .map((item, key) => {
                        return <option key={key}>{item}</option>;
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
  teams: state.teams,
  tickets: state.tickets,
});
export default connect(mapStateToProps, {
  deriveTicket,
  clearErrors,
  getTeams,
  getTickets,
})(DeriveTicketModal);
