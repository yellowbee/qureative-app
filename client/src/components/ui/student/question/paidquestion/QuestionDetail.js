/**
 * This is the page to present a question from a user.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileIcon from '../../../common/ProfileIcon';
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
            <div id="question-detail">
                <h2>{this.props.questionDetail.title}</h2>
                <h4>{this.props.questionDetail.tags}</h4>
                <ProfileIcon profileImg={this.props.questionDetail.profileImg} userName={this.props.questionDetail.userName}/>
                {/*<p>{this.props.questionDetail.description.split('\n').map((text) => (
                    <div>{text}</div>
                ))}</p>*/}
                <div>{(this.props.questionDetail.description != null) && this.props.questionDetail.description.map((block) => {
                    if (block.type === 'text') {
                        return <div className="paragraph">{block.value}</div>
                    } else if (block.type === 'image') {
                        return <img src={block.imgUrl} />
                    }
                })}
                </div>
                <img className="question-img" src={this.props.questionDetail.qImageBig}/>
                <div id="solution"><h2>Tutor Solution</h2></div>
            </div>
        )
    }
};

let mapStateToProps = (state) => ({
    questionDetail: state.questionDetail
});

let mapDispatchToProps = (dispatch) => ({
    getQuestionDetail: (id) => { dispatch(getQuestionDetail(id)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail);