/**
 * Created by bhuang on 7/1/18.
 */
/**
 * Created by bhuang on 6/26/18.
 */
import React, { Component } from "react";
import moment from "moment";
import "../../../../../css/schedule/ProposalCard.scss";
import "../../../../../qureative-ui/css/radio-group.scss";

class ProposalCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioGroup: [false, false, false]
    };

    this.radioCallback = this.radioCallback.bind(this);
  }

  radioCallback(i) {
    let radioGroup = this.state.radioGroup.map((item, j) => {
      return i === j;
    });

    this.setState({ radioGroup });
  }

  render() {
    let {
      status,
      qid,
      proposedBy,
      proposedTo,
      description,
      timeOptions
    } = this.props.proposal;

    return (
      <div className="proposalcard">
          <div>By {proposedBy}</div>
          <div>To {proposedTo}</div>
          <div className="proposal-desc">{description}</div>

          <div className="radio-group">
            {timeOptions.map((option, i) => (
              <div className="radio-item">
                <div
                  className="halo"
                  onClick={() => {
                    this.radioCallback(i);
                  }}
                >
                  {this.state.radioGroup[i] && <div className="sun" />}
                </div>
                <div className="radio-label" style={{ fontSize: '0.8em'}}>
                  <span>{moment(option.startTime).format("YYYY/MM/DD")} &nbsp;&nbsp;</span>
                    <span>{moment(option.startTime).format("LT")} - </span>
                  <span>{moment(option.endTime).format("LT")}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="proposal-btns">
        <button className="proposal-btn" style={{backgroundColor: 'white', color: 'gray'}}>Not interested</button>
        <button className="proposal-btn">Hire</button>
          </div>
      </div>
    );
  }
}

export default ProposalCard;
