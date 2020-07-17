import React, { Component } from "react";
import { Container, Card } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../store/actions/authActions";
import { clearErrors } from "../../store/actions/errorActions";
import { Alert, Label, Input, Form, FormGroup, Button } from "reactstrap";
import { withRouter, Link } from "react-router-dom";

export class LoginPage extends Component {
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
  onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password,
    };
    //Attempt to login
    this.props.login(user);
  };
  render() {
    return (
      <div className="container h-100">
        <div className="row align-items-center h-100">
          <div className="col-6 mx-auto">
            <Card className="px-5 py-5">
              {this.state.msg ? (
                <Alert color="danger">{this.state.msg}</Alert>
              ) : null}
              <h3 className="text-center">Welcome again !</h3>
              <Form onSubmit={this.onSubmit} className="mt-3">
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="mb-3"
                    onChange={this.onChange}
                  />
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="mb-3"
                    onChange={this.onChange}
                  />
                  <Button color="dark" block style={{ marginTop: "2rem" }}>
                    Login
                  </Button>
                  <Link to="/logindemo">
                    <p className="forgot-password text-right">
                      Login as a demo user <a href="/">here</a>
                    </p>
                  </Link>
                  <p className="forgot-password text-right">
                    Sign Up <a href="/register">here</a>
                  </p>
                </FormGroup>
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
  connect(mapStateToProps, { login, clearErrors })(LoginPage)
);
