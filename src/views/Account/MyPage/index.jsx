import {useEffect, useRef, useState} from "react";
import {getPrivateApi} from "../../../apis/privateApi";
import {GET_USER} from "../../../apis/user/accountURL";
import ResponseCode from "../../../enums/response-code";
import {useUserInfo} from "../../../stores/user_store";
import {useNavigate} from "react-router-dom";
import HeaderBox from "../../../components/headerBox";
import defaultProfileImg from "../../../assets/images/default-profile-image.jpeg";
import camera from "../../../assets/images/camera-img.png";
import './style.css';
import InfoBox from "../../../components/infoBox";

function MyPage (props) {
    // store
    const { userInfo, setUserInfo } = useUserInfo();

    // useNavigate
    const navigate = useNavigate();

    // ref
    const profileImgRef = useRef(null);

    // value

    // useEffect
    useEffect(() => {
        getPrivateApi(GET_USER()).then(getUserResponse);
    }, []);

    // onChange
    const onProfileImgChangeHandler = (event) => {

    };

    // onClick
    const onPrevClickHandler = () => {
        navigate('/');
    }

    const onProfileImgClickHandler = () => {
        if(!profileImgRef.current) return;
        profileImgRef.current.click();
    }

    const onSignOutTextClick = () => {
        navigate('/');
    }

    const onResignationClick = () => {
        navigate('/');
    }

    // response
    const getUserResponse = (responseBody) => {
        if(!responseBody) return;
        const { code } = responseBody;

        if(code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if(code !== ResponseCode.SUCCESS) return;

        setUserInfo(responseBody);
    }

    return (
        <div className='wrapper'>
            <HeaderBox onClick={onPrevClickHandler} title='마이페이지'/>
            <div className='content-wrapper'>
                <div className='profile-img-box'>
                    <div className='profile-img' onClick={onProfileImgClickHandler}
                         style={{backgroundImage: `url(${userInfo.userProfileImg ? userInfo.userProfileImg : defaultProfileImg})`}}>
                        <input ref={profileImgRef} type='file' accept='image/*' style={{display: 'none'}}
                               onChange={onProfileImgChangeHandler}/>
                        <div className='camera' style={{backgroundImage: `url(${camera}`}}></div>
                    </div>
                </div>
                <div className='user-info-wrapper'>
                    <InfoBox title='닉네임' value={userInfo.userNickname} url='/account/nickname'/>
                    <InfoBox title='이메일' value={userInfo.userEmail}/>
                    <InfoBox title='이름' value={userInfo.userName}/>
                    <InfoBox title='휴대폰 번호' value={userInfo.userTel} url = '/account/tel' />
                    <InfoBox title='연결된 소셜 계정' value={userInfo.userType} isLast={true} />
                </div>
            </div>
            <div className='text-link-container'>
                <span className='text-link' onClick={onSignOutTextClick}>로그아웃</span>&nbsp;|&nbsp;<span
                className='text-link' onClick={onResignationClick}>회원탈퇴</span>
            </div>
        </div>
    )
}

export default MyPage;