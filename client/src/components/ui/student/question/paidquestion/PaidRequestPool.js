/**
 * Created by bhuang on 1/15/18.
 */

import React, { Component } from "react";
import QuestionCard from "../../../common/QuestionCard";
import SearchBar from "../../../common/SearchBar";
import DropDownFilter from "../../../common/DropDownFilter";
import { connect } from "react-redux";
import { getQuestions } from "../../../../../actions/action_question";
import _ from "lodash";
import "../../../../../../css/student/question/paidquestion/PaidRequestPool.scss";

//const PaidRequestPool = ({questionCards}) => {
class PaidRequestPool extends Component {
  constructor() {
    super();
    this.state = {
      showLogin: false,
      showSignup: false,
      serverPort: localStorage.getItem("server_port")
    };

    //this.handleOpenLogin = this.handleOpenLogin.bind(this);
    //this.handleCloseLogin = this.handleCloseLogin.bind(this);

    //this.handleOpenSignup = this.handleOpenSignup.bind(this);
    //this.handleCloseSignup = this.handleCloseSignup.bind(this);

    this.handlePostQuestion = this.handlePostQuestion.bind(this);
  }

  componentDidMount() {
    this.props.getQuestions();
  }

  renderQuestionCards() {
    return _.map(this.props.questions, q => {
      return <QuestionCard {...q} />;
    });

    /*return this.props.questions.map((q) =>
      <QuestionCard {...q} />
    )*/
  }

  handlePostQuestion() {
    if (_.isEmpty(this.state.serverPort) && _.isEmpty(this.props.auth)) {
      this.handleOpenLogin();
    } else {
      this.props.history.push("/new-question/description");
    }
  }

  render() {
    return (
      <div id="q-pool">
        {/*<SearchBar />
        <DropDownFilter />*/}
        <div id="qa-tool-bar">
          <button id="qa-post" onClick={this.handlePostQuestion}>
            <span>Post a Question</span>
          </button>
          <div style={{ clear: "both" }} />
        </div>
        <div id="qa-sched-container">
          <div id="cards-wrapper">{this.renderQuestionCards()}</div>
          <div id="qa-tool-sidebar">
            <div className="qa-sidebar-tool">Classroom</div>
            <div className="qa-sidebar-tool">Schedule</div>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  questions: state.questions,
  auth: state.auth
});

let mapDispatchToProps = dispatch => ({
  getQuestions: () => {
    dispatch(getQuestions());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PaidRequestPool);
