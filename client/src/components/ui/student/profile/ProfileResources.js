/**
 * Created by bhuang on 3/18/18.
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import ProfileProjects from './ProfileProjects';
import '../../../../../css/profile/ProfileResources.scss';

class ProfileResources extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabSelected : {
                projectsTab: true,
                qaTab: false,
                reviewsTab: false
            }
        };
        this.getProjectsByUserName = this.getProjectsByUserName.bind(this);
    }

    getProjectsByUserName() {
        axios
            .get(
                `https://whenty-ws.herokuapp.com/api/projects/${
                    this.props.auth.userName
                    }`
            )
            .then(response => {
                console.log("PROFILE RESPONSE");
                console.log(response);
                this.setState({ projects: response.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        this.getProjectsByUserName();
    }

    render() {
        return (
            <div>
                <ul className="profileresources-tabs">
                    <li style={this.state.tabSelected.projectsTab ? {borderBottom: "3px solid blue"} : null} onClick={() => {
                        this.setState({ tabSelected : { projectsTab: true, qaTab: false, reviewsTab: false }});
                        this.getProjectsByUserName();
                    }}><a>Projects</a></li>
                    <li style={this.state.tabSelected.qaTab ? {borderBottom: "3px solid blue"} : null} onClick={() => {
                        this.setState({ tabSelected : { projectsTab: false, qaTab: true, reviewsTab: false }});
                    }}><a>Q&A</a></li>
                    <li style={this.state.tabSelected.reviewsTab ? {borderBottom: "3px solid blue"} : null} onClick={() => {
                        this.setState({ tabSelected : { projectsTab: false, qaTab: false, reviewsTab: true }});
                    }}><a>Reviews</a></li>
                </ul>

                {this.state.tabSelected.projectsTab && <ProfileProjects projects={this.state.projects} />}
            </div>
        )
    }
}

let mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(ProfileResources);
