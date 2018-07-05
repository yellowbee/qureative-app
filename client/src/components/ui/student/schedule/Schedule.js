/**
 * Created by bhuang on 7/1/18.
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import ProposalCard from "./ProposalCard";
import Filter from "../../../../../qureative-ui/src/ui/Filter";
import SimpleDropdownList from "../../../../../qureative-ui/src/ui/SimpleDropdownList";
import axios from "axios";
import { LOCAL_API_ROOT_URL, API_ROOT_URL } from "../../../../../src/constants";
import "../../../../../css/schedule/Schedule.scss";

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directionTags: [],
      statusTags: []
    };
    this.getToProposals = this.getToProposals.bind(this);
    this.getProposals = this.getProposals.bind(this);
    this.updateDirectionTags = this.updateDirectionTags.bind(this);
    this.updateStatusTags = this.updateStatusTags.bind(this);
  }

  getToProposals() {
    axios
      .get(`${API_ROOT_URL}/api/proposals/to/${this.props.auth.userName}`)
      .then(response => {
        console.log("PROFILE RESPONSE");
        console.log(response);
        this.setState({ toProposals: response.data.result });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getProposals() {
    axios
      .get(`${API_ROOT_URL}/api/proposals/${this.props.auth.userName}`)
      .then(response => {
        console.log("PROFILE RESPONSE");
        console.log(response);
        this.setState({ proposals: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateDirectionTags(tag, on) {
    let directionTags = this.state.directionTags;
    if (on) {
      directionTags.push(tag);
    } else {
      directionTags = directionTags.filter(item => item !== tag);
    }
    this.setState({ directionTags });
  }

  updateStatusTags(tag, on) {
    let statusTags = this.state.statusTags;
    if (on) {
      statusTags.push(tag);
    } else {
      statusTags = statusTags.filter(item => item !== tag);
    }
    this.setState({ statusTags });
  }

  componentDidMount() {
    //this.getToProposals();
    this.getProposals();
  }

  render() {
    console.log(this.state);

    return (
      <div className="schedule-bg">
        <div className="schedule-panel">
          Schedule
          <div className="schedule-filters">
            <div className="schedule-filter">
              <Filter
                title={"offer/receive"}
                itemList={["offer", "receive"]}
                updateFilterTags={this.updateDirectionTags}
              />
            </div>
            <div className="schedule-filter">
              <Filter
                title={"Status"}
                itemList={["pending", "accpeted", "rejected", "completed"]}
                updateFilterTags={this.updateStatusTags}
              />
            </div>
          </div>
          <div className="schedule-cards">
            <div>Proposals being offered to me</div>

              {this.state.proposals &&
              this.state.proposals.receive &&
                this.state.proposals.receive.map(
                toProposal =>
                (_.isEmpty(this.state.directionTags) || this.state.directionTags.includes("receive")) &&
                (_.isEmpty(this.state.statusTags) || this.state.statusTags.includes(toProposal.status.toLowerCase())) &&
                <ProposalCard proposal={toProposal}/>
                )}

            <div>Proposals I am offering</div>
            {this.state.proposals &&
              this.state.proposals.offer &&
              this.state.proposals.offer.map(
                fromProposal =>
                  (_.isEmpty(this.state.directionTags) ||
                    this.state.directionTags.includes("offer")) &&
                  (_.isEmpty(this.state.statusTags) ||
                    this.state.statusTags.includes(
                      fromProposal.status.toLowerCase()
                    )) && <ProposalCard proposal={fromProposal} />
              )}
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Schedule);
