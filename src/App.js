import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";
import Login from "./containers/Login";
import Signup from "./containers/Signup";

import "./App.css";
import "antd/dist/antd.css";
import * as actions from "./store/actions/auth";

import CustomLayout from "./containers/Layout";
import SigninLayout from "./containers/SigninLayout";

class App extends Component {
  componentDidMount() {
    this.props.onTryToSigngup();
  }

  render() {
    return (
      <div className="App">
        {this.props.isAuthenticated ? (
          <Router>
            <CustomLayout {...this.props}>
              <BaseRouter />
            </CustomLayout>
          </Router>
        ) : (
          <Router>
            <SigninLayout>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
            </SigninLayout>
          </Router>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryToSigngup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
