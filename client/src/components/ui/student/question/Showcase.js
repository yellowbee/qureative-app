/**
 * Created by bhuang on 1/13/18.
 */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import TutorProjCard from "../../common/TutorProjCard";
import "../../../../../css/common/Showcase.scss";
import { connect } from "react-redux";

class Showcase extends Component {
   constructor() {
       super();
       this.state = {
           //serverPort: localStorage.getItem("server_port")
       };
       this.handlePostQuestion = this.handlePostQuestion.bind(this);
    }
  //console.log("Project cards from promise: " + projectCards);

    handlePostQuestion() {
        if (this.props.auth && this.props.auth.token) {
            this.props.history.push("/new-project");
        } else {
            this.handleOpenLogin();
        }
    }

    render() {
        return (
            <div id="showcase-container">
            <div id="show-case">
                <div id="showcase-toolbar">
                    <button id="showcase-post" onClick={this.handlePostQuestion}>
                        <span>Post a Project</span>
                    </button>
                    <div class="clear-bar" style={{clear: "both"}}/>
                </div>
                <div className="cardWrapper">
                    {this.props.projectCards.map(proj => <TutorProjCard {...proj} />)}
                </div>
            </div>
            </div>
        );
    }
}

let mapStateToProps = state => ({
  projectCards: state.projectCards,
  auth: state.auth
});

export default withRouter(connect(mapStateToProps)(Showcase));
