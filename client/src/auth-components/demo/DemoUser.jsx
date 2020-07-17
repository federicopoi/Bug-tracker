import React, { Component } from "react";
import { Container, Card } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../store/actions/authActions";
import { clearErrors } from "../../store/actions/errorActions";
import {
  Alert,
  Label,
  Input,
  Form,
  FormGroup,
  Button,
  Row,
  Col,
} from "reactstrap";
import { withRouter } from "react-router-dom";

export class DemoUser extends Component {
  state = {
    email: "",
    password: "",
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //Check for login error
      if (error.id === "LOGIN_FAIL") {
        this.setState({
          msg: error.msg.msg,
        });
      } else {
        this.setState({
          msg: null,
        });
      }
    }
    if (isAuthenticated) {
      this.props.history.push("/");
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  login(email, password) {
    const user = {
      email,
      password,
    };
    //Attempt to login
    this.props.login(user);
  }
  render() {
    return (
      <div className="container h-100">
        <div className="row align-items-center h-100">
          <div className="col-6 mx-auto">
            <Card className="px-5 py-5">
              {this.state.msg ? (
                <Alert color="danger">{this.state.msg}</Alert>
              ) : null}
              <h3 className="text-center">Login Demo</h3>
              <Form className="mt-3">
                <Row>
                  <Col>
                    <Button
                      onClick={() =>
                        this.login("admindemo@gmail.com", "admindemo.1")
                      }
                    >
                      Admin
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      onClick={() =>
                        this.login("prjmandemo@gmail.com", "prjmandemo.1")
                      }
                    >
                      Project Manager
                    </Button>
                  </Col>
                  <Col className="mb-3">
                    <Button
                      onClick={() =>
                        this.login("teammandemo@gmail.com", "teammandemo.1")
                      }
                    >
                      Team manager
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      onClick={() =>
                        this.login("submitterdemo@gmail.com", "submitterdemo.1")
                      }
                    >
                      Submitter
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      onClick={() =>
                        this.login("updaterdemo@gmail.com", "updaterdemo.1")
                      }
                    >
                      Updater
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});
export default withRouter(
  connect(mapStateToProps, { login, clearErrors })(DemoUser)
);
