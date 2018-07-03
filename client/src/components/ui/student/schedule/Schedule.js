/**
 * Created by bhuang on 7/1/18.
 */

import React, { Component } from 'react';
import ProposalCard from './ProposalCard';
import { connect } from "react-redux";
import axios from 'axios';
import { LOCAL_API_ROOT_URL, API_ROOT_URL } from '../../../../../src/constants';
import '../../../../../css/schedule/Schedule.scss';

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getToProposals = this.getToProposals.bind(this);
    }

    getToProposals() {
        axios
            .get(
                `${API_ROOT_URL}/api/proposals/to/${
                    this.props.auth.userName
                    }`
            )
            .then(response => {
                console.log("PROFILE RESPONSE");
                console.log(response);
                this.setState({ toProposals: response.data.result });
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        this.getToProposals();
    }

    render() {
        return (
            <div className="schedule-bg">
                <div className="schedule-panel">
                    Schedule
                    { this.state.toProposals && this.state.toProposals.map(( toProposal ) =>
                        <ProposalCard proposal={ toProposal } />
                    )}
                </div>
            </div>
        )
    }
}

let mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(Schedule);