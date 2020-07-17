import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Fulllayout from "./layouts/fulllayout";

import LoginPage from "./auth-components/login/loginpage";
import DemoUser from "./auth-components/demo/DemoUser";
import RegisterPage from "./auth-components/register/registerpage";
import "./assets/scss/style.css";
import "./index.css";
import PrivateRoute from "./PrivateRoute";
import { loadUser } from "./store/actions/authActions";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.store.dispatch(loadUser());
    console.log(this.props);
  }
  render() {
    console.log(this.props.isLoading);
    console.log(this.props.isAuthenticated);

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/logindemo">
            <DemoUser />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <PrivateRoute
            path="/"
            component={Fulllayout}
            isLoading={this.props.isLoading}
            authed={this.props.isAuthenticated}
            user={this.props.user}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    isLoading: state.auth.isLoading,
  };
};
export default connect(mapStateToProps)(App);
