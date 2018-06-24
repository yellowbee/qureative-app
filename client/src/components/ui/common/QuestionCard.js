import React from "react";
import ProfileIcon from "./ProfileIcon";
import { withRouter, Link } from "react-router-dom";
import history from "../../../../src/browser";
import { getQuestionDetail } from "../../../actions/action_questionDetail";
import { connect } from "react-redux";
import "../../../../css/common/QuestionCard.scss";

/**
 *
 * @param id id of this question
 * @param qImage thum
 * @param tags
 * @param location
 * @param title
 * @param profileImg
 * @param userName
 * @param hrLeftToAns
 * @param numFollowees
 * @param numFollowers
 * @param price
 * @param getQuestionDetail
 * @returns {XML}
 * @constructor
 */
const QuestionCard = ({
  _id,
  qImage,
  tags,
  location,
  title,
  profileImg,
  userName,
  hrLeftToAns,
  numFollowees,
  numFollowers,
  price,
  getQuestionDetail
}) => {
  return (
    <div className="q-card">
      <div className="q-img">
        {/*<Link onClick={() => {
                    getQuestionDetail();
                    history.push('/request-pool/question-detail');
                }}
                   href="javascript:;">*/}
        <Link to={`/question-pool/question-detail/${_id}`}>
          <img src={qImage} />
        </Link>
        <div id="price">$ {price}</div>
      </div>
      <div className="q-info">
        <div id="tag-loc">
          {tags.map(tag => <span style={{ padding: "0 2px" }}>{tag}</span>)} |{" "}
          {location}
        </div>
        <div id="title">{title}</div>
        <div id="prof-name">
          <ProfileIcon profileImg={profileImg} userName={userName} />
        </div>
        <div id="btn">
          <button>Save</button>
        </div>
        <div id="time-follow">
          <span>{hrLeftToAns} left to answer</span>
          <span>{numFollowees} |</span>
          <span>{numFollowers}</span>
        </div>
      </div>
      <div style={{clear: "both"}}/>
    </div>
  );
};

let mapDispatchToProps = dispatch => ({
  getQuestionDetail: () => {
    dispatch(getQuestionDetail());
  }
});

export default connect(null, mapDispatchToProps)(QuestionCard);
