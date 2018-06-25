/**
 * Created by bhuang on 1/14/18.
 */

import React, { Component } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { setToken } from '../../../actions/action_auth';
import Header from "../common/Header";
import NavbarMain from "../common/NavbarMain";
import FormQuestion from "./question/postquestion/FormQuestion";
import FormProject from "./project/postproject/FormProject";
//import Footer from '../common/Footer';
import { Route, Switch } from "react-router-dom";
import "../../../../css/student/Student.scss";

class Student extends Component {
  constructor(props) {
    super(props);
    this.hideInnderDiv = this.hideInnderDiv.bind(this);
      /**
       * To enable login-free mode
       */
    /*axios.get("http://localhost:8601").then(() => {
      localStorage.setItem("server_port", "8601");
    });*/
      let token = localStorage.getItem("token");
      if (token) {
          axios.get(`https://whenty-ws.herokuapp.com/api/user/renew/${token}`)
              .then((response) => {
                  this.props.setToken(response.data);
              })
              .catch((err) => {
                localStorage.removeItem("token");
              });
      }
  }

  hideInnderDiv(e) {
    console.log("root container clicked");
    if (
      e.target != document.getElementById("home-button") &&
      e.target != document.getElementById("home-btn-icon") &&
      e.target != document.getElementById("home-btn-dropdown") &&
      e.target != document.getElementById("home-btn-head")
    ) {
      document.getElementById("home-btn-dropdown") &&
      (document.getElementById("home-btn-dropdown").className =
        "select-dropdown hide");
    }

    if (e.target != document.getElementById("qureative-dropdown-selected")) {
      document.getElementById("qureative-dropdown-list") &&
        (document.getElementById("qureative-dropdown-list").className =
          "select-dropdown hide");
    }
  }

  render() {
    console.log(this.props.state);
    return (
      <div id="root-container" onClick={this.hideInnderDiv}>
        <Header />
          <Switch>
            <Route path="/new-question" component={FormQuestion} />
            <Route path="/new-project" component={FormProject} />
            <Route path="/" component={NavbarMain} />
          </Switch>
        {/*<NavbarMain/>*/}
      </div>
    );
  }
}

let mapStateToProps = state => ({
    state: state
});

let mapDispatchToProps = dispatch => ({
    setToken: (value) => {
        dispatch(setToken(value));
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Student));
