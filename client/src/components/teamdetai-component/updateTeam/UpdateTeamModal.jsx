import React, { Component } from "react";
import { updateTeam } from "../../../store/actions/teamActions";
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
export class UpdateTeamModal extends Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.getTeams();
  }
  state = {
    modal: false,
    name: this.props.name,
    updaters: {},
    msg: null,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for login error
      console.log(error.msg.msg);
      if (error.id === "UPDATE_TEAM_FAIL") {
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
    const { name, updaters } = this.state;

    // Update Team object
    const updatedTeam = {
      name,
      updaters,
    };
    this.props.updateTeam(updatedTeam);
    if (updaters && updaters.length) {
      this.toggle();
    }
  };
  render() {
    const { users } = this.props.users;
    const { teams } = this.props.teams;

    return (
      <div>
        <Button onClick={this.toggle}>Manage</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Reasign Team Users</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="updaters">Updaters</Label>
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
  teams: state.teams,
});
export default connect(mapStateToProps, {
  updateTeam,
  clearErrors,
  getUsers,
  getTeams,
})(UpdateTeamModal);
