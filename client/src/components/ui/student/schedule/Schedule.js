/**
 * Created by bhuang on 7/1/18.
 */

import React, { Component } from 'react';
import SessionCard from './SessionCard';
import '../../../../../css/schedule/Schedule.scss';

class Schedule extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="schedule-bg">
                <div className="schedule-panel">
                    Schedule
                    <SessionCard tags={['art', 'design']}
                                 title={'Awesome Question'}
                                 price={ 50 } />
                </div>
            </div>
        )
    }
}

export default Schedule;