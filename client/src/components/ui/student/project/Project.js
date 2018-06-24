/**
 * This is the page that presents a project content.
 * Created by bhuang on 5/13/18.
 */

import React, { Component } from "react";
import axios from 'axios';
import CommentList from "../../common/comment/CommentList";
import { URL_ROOT } from "../../../../actions/constants";
import "../../../../../css/student/project/Project.scss";

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectDetail: null
        };
        this.getProjectDetail = this.getProjectDetail.bind(this);
    }

    getProjectDetail(id) {
        axios.get(`${URL_ROOT}/project-detail/${id}`)
            .then((response) => {
                console.log(response);
                this.setState({projectDetail: response.data});
            })
    }

    componentDidMount() {
        this.getProjectDetail(this.props.match.params.id);
    }

    render() {

        return (
        this.state.projectDetail &&
        <div>
            <div className="project-title">{this.state.projectDetail.title}</div>
            <div>{(this.state.projectDetail.description != null) && this.state.projectDetail.description.map((block) => {
                if (block.type === 'text') {
                    return <div className="project-paragraph">{block.value}</div>
                } else if (block.type === 'image') {
                    return <div className="project-img"><img src={block.imgUrl} /></div>
                }
            })}
            </div>
            <CommentList projId={this.state.projectDetail._id} />
        </div>
        );
    }
}

export default Project;