/**
 * Created by bhuang on 7/1/18.
 */
/**
 * Created by bhuang on 6/26/18.
 */
import React, { Component } from "react";
import "../../../../../css/schedule/SessionCard.scss";

class SessionCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let {
            _id,
            qImage,
            tags,
            location,
            title,
            profileImg,
            fullName,
            hrLeftToAns,
            numFollowees,
            numFollowers,
            price,
            getQuestionDetail
        } = this.props;

        return (
            <div className="sessioncard">
                    <div>
                        <div id="tag-loc">
                            <span className="profile-qcard-text">${price} | </span>
                            {tags.map(tag => (
                                <span style={{ padding: "0 2px" }}>{tag}</span>
                            ))}{" "}
                            | {location}
                        </div>
                        <div id="title">{title}</div>
                        <div id="prof-name">
                            {/*<img className="avatar" src={profile.basicInfo.profileIcon.imgUrl}/>*/}
                        </div>
                    </div>
            </div>
        );
    }
}

export default SessionCard;
