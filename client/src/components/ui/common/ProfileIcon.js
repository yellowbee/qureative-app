import React from 'react';
import '../../../../css/common/ProfileIcon.scss'

const ProfileIcon = ({profileImg, userName, status}) => {
    return (
        <div id="profile-frame">
            <img src={profileImg}/>
            <div id="status"/>
            <span>&nbsp;&nbsp;&nbsp;{userName}</span>
        </div>
    )
};

export default ProfileIcon;
