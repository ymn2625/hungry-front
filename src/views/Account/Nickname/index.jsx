import {useRef, useState} from "react";
import ResponseCode from "../../../enums/response-code";
import {patchPrivateApi} from "../../../apis/privateApi";
import {PATCH_NICKNAME_URL} from "../../../apis/user/accountURL";
import {useUserInfo} from "../../../stores/user_store";
import HeaderBox from "../../../components/headerBox";
import {useNavigate} from "react-router-dom";
import InputBox from "../../../components/inputBox";
import "./style.css";

function Nickname(props) {
    // useNavigate
    const navigate = useNavigate();

    // store
    const { userInfo, setUserInfo } = useUserInfo();

    // ref
    const nicknameRef = useRef(null);

    // value
    const [userNickname, setUserNickname] = useState('');

    // error message
    const [nicknameError, setNicknameError] = useState('');

    // class
    const nickNameButtonClass = (!nicknameError && userNickname) ? 'button-on' : 'button-off';

    // onChange
    const onNicknameChangeHandler = (event) => {
        const { value } = event.target;
        setUserNickname(value);

        if(value.length < 2) {
            setNicknameError('닉네임을 2자 이상 입력해주세요.');
        } else {
            setNicknameError('')
        }
    }

    // onClick
    const onPrevClickHandler = () => {
        navigate('/account/user');
    }

    // response
    const patchNicknameResponse = (responseBody) => {
        if(!responseBody) return;
        const { code } = responseBody;

        if(code === ResponseCode.VALIDATION_FAIL) setNicknameError('닉네임을 2자 이상 입력해주세요.')
        if(code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if(code === ResponseCode.NOT_EXIST_USER) {
            alert("다시 시도해주세요!");
            navigate('/account/user');
        }
        if(code !== ResponseCode.SUCCESS) return;

        alert("성공적으로 변경되었습니다.");
        navigate('/account/user');
    }

    const onNicknameButtonClickHandler = () => {
        const userEmail = userInfo.userEmail;
        const requestBody = { userEmail, userNickname };
        patchPrivateApi(PATCH_NICKNAME_URL(), requestBody).then(patchNicknameResponse)
    }

    return (
        <div className='nickname-wrapper'>
            <HeaderBox onClick={onPrevClickHandler} title='닉네임 변경'/>
            <div className='content-box'>
                <div className='main-box'>
                    <div className='title'>새로운 닉네임을 입력해주세요</div>
                    <InputBox ref={nicknameRef} title='닉네임' placeholder={userInfo.userNickname} type='text'
                              value={userNickname} onChange={onNicknameChangeHandler} message={nicknameError}/>
                </div>
                <div className={nickNameButtonClass} onClick={onNicknameButtonClickHandler}>
                    다음
                </div>
            </div>
        </div>
    )
}

export default Nickname;