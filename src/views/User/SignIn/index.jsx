import HeaderBox from "../../../components/headerBox";
import TitleBox from "../../../components/titleBox";
import InputBox from "../../../components/inputBox";
import {useRef, useState} from "react";
import "./style.css";

function SignIn(props) {

    const emailRef  = useRef(null);
    const passwordRef = useRef(null);

    // value
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    // update value
    const updateUserData = (key, value) => {
        setUserData(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    const onPrevClickHandler = () => {}
    const onInputChangeHandler = (key, event) => {
        const { value } = event.target;
        updateUserData(key, value);
    }

    const onButtonClickHandler = () => {}

    const buttonClass = userData.email && userData.password ? 'button-on' : 'button-off';

    return (
        <div className='sign-up-wrapper'>
            <HeaderBox onClick={onPrevClickHandler} title='로그인'/>
            <div className='sign-up-container'>
                <div className='sign-up-content'>
                    <TitleBox title=' 배고팟 로그인' subTitle='배고팟과 함께 맛있는 한 끼!'></TitleBox>
                    <div className='sign-up-content-input-box'>
                        <InputBox ref={emailRef} title='이메일' placeholder='이메일 입력' type='text' value={userData.email}
                                  onChange={(event) => onInputChangeHandler('email', event)}/>
                        <InputBox ref={passwordRef} title='비밀번호' placeholder='8-13자 숫자, 문자 포함' type='password'
                                  value={userData.password}
                                  onChange={(event) => onInputChangeHandler('password', event)}/>
                    </div>
                    <div className='text-link-container'>
                        <span className='text-link'>회원가입</span>&nbsp;|&nbsp;<span className='text-link'>아이디 찾기</span>&nbsp;|&nbsp;<span className='text-link'>비밀번호 찾기</span>
                    </div>
                    <div className='divide-container'>
                        <div className='divide-line'></div>
                        <div className='divide-text'>&nbsp;또는&nbsp;</div>
                        <div className='divide-line'></div>
                    </div>
                    <div>
                    <div className='social-login-container'>
                            <div className='naver-login'></div>
                            <div className='kakao-login'></div>
                        </div>
                    </div>
                </div>
                <div className={buttonClass} onClick={onButtonClickHandler}>다음</div>
            </div>
        </div>
    )
}

export default SignIn;