/**
 * This is the page to present a question from a user.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileIcon from '../../../common/ProfileIcon';
import SessionProposal from '../../schedule/SessionProposal';
import '../../../../../../css/student/question/paidquestion/QuestionDetail.scss';
import {getQuestionDetail} from "../../../../../actions/action_questionDetail";

class QuestionDetail extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //const { id } = this.props.match.params;
        console.log('Route params: ' + this.props.match.params.id);
        this.props.getQuestionDetail(this.props.match.params.id);
    }

    render() {
        return (
            <div className="question-detail">
                <h2>{this.props.questionDetail.title}</h2>
                <h4>{this.props.questionDetail.tags}</h4>
                <ProfileIcon profileImg={this.props.questionDetail.profileImg} fullName={this.props.questionDetail.fullName}/>
                {/*<p>{this.props.questionDetail.description.split('\n').map((text) => (
                    <div>{text}</div>
                ))}</p>*/}
                <div>{(this.props.questionDetail.description != null) && this.props.questionDetail.description.map((block) => {
                    if (block.type === 'text') {
                        return <div className="paragraph">{block.value}</div>
                    } else if (block.type === 'image') {
                        return <div className="question-img"><img src={block.imgUrl} /></div>
                    }
                })}
                </div>
                <div id="solution"><h2>Tutor Solution</h2></div>
                {this.props.auth.userName !== this.props.questionDetail.userName &&
                    <SessionProposal qid={this.props.questionDetail._id} proposedTo={this.props.questionDetail.userName} />
                }
            </div>
        )
    }
};

let mapStateToProps = (state) => ({
    auth: state.auth,
    questionDetail: state.questionDetail
});

let mapDispatchToProps = (dispatch) => ({
    getQuestionDetail: (id) => { dispatch(getQuestionDetail(id)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail);