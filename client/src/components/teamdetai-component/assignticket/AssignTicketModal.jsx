import React, { Component } from "react";
import { assignTicket } from "../../../store/actions/ticketsActions";
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
export class AssignTicketModal extends Component {
  componentDidMount() {
    this.props.getTeams();
  }
  state = {
    modal: false,
    summary: this.props.summary,
    assignedTo: "",
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for login error
      console.log(error.msg.msg);
      if (error.id === "ASSIGN_TICKET_FAIL") {
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
    const { summary, assignedTo } = this.state;

    // Create Project object
    const updatedTicket = {
      summary,
      assignedTo,
    };
    this.props.assignTicket(updatedTicket);
    if (assignedTo !== "") {
      this.toggle();
    }
  };
  render() {
    const { teams } = this.props.teams;
    return (
      <div>
        <Button onClick={this.toggle}>Assign Ticket</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Assign {this.props.summary} ticket
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="exampleSelect" className="mt-3">
                  Select Updater to assign
                </Label>
                <Input
                  type="select"
                  name="assignedTo"
                  id="assignedTo"
                  onChange={this.onChange}
                >
                  ><option>Select Option</option>
                  {teams &&
                    teams
                      .filter(({ name }) => name === this.props.name)
                      .map(({ updaters, _id }) => {
                        return (
                          updaters &&
                          updaters.map((item, index) => {
                            return <option key={index}>{item}</option>;
                          })
                        );
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
});
export default connect(mapStateToProps, {
  assignTicket,
  clearErrors,
  getTeams,
})(AssignTicketModal);
