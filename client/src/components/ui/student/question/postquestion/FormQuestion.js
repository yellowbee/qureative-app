/**
 * Question form for a user to post a new question.
 * Created by bhuang on 2/18/18.
 */

import React, { Component } from "react";
import { Route, NavLink, Switch, withRouter } from "react-router-dom";
import FormQuestionDesc from './FormQuestionDesc';
import FormTest from './FormTest';
import '../../../../../../css/student/question/postquestion/FormQuestion.scss';

export default class FormQuestion extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="form-link">
                <ul>
                    <li>
                        <NavLink activeClassName="selected" to="/new-question/description">
                            1. Question description
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="selected" to="/new-question/price">
                            2. Deadline and price
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="selected" to="/new-question/confirm">
                            3. Review and confirm
                        </NavLink>
                    </li>
                </ul>
                <Switch>
                    {/*
                     Use "render" instead of "component" so that parameters can be passed in
                     */}
                    <Route path="/new-question/description" component={FormQuestionDesc} />
                    <Route path="/new-question/price" component={FormTest} />
                </Switch>
            </div>
        );
    }
}

