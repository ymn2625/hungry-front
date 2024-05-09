import {signInRequest, SNS_SIGN_IN_URL} from "../../../apis/user";
import ResponseCode from "../../../enums/response-code.enum";
import HeaderBox from "../../../components/headerBox";
import TitleBox from "../../../components/titleBox";
import InputBox from "../../../components/inputBox";
import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import "./style.css";

function SignIn(props) {

    // navigate
    const navigate = useNavigate();

    // ref
    const emailRef  = useRef(null);
    const passwordRef = useRef(null);

    // value
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    // error
    const [message, setMessage] = useState('');

    // response
    const signInResponse = (responseBody) => {
        if(!responseBody) return;
        const { code } = responseBody;

        if(code === ResponseCode.VALIDATION_FAIL) alert('아이디 또는 비밀번호의 형식을 확인하세요.');
        if(code === ResponseCode.SIGN_IN_FAIL) setMessage('로그인 정보가 일치하지 않습니다.');
        if(code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if(code !== ResponseCode.SUCCESS) return;

        const { token, expirationTime } = responseBody;

        const now = (new Date().getTime()) * 1000;
        const expires = new Date(now + expirationTime);

        localStorage.setItem('accessToken', token, {expires, path: '/'});
        navigate('/');
    }

    // onChange
    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserEmail(value);
        setMessage('');
    };
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserPassword(value);
        setMessage('');
    };

    // onClick
    const onPrevClickHandler = () => {}

    const onButtonClickHandler = () => {
        if(!userEmail || !userPassword) {
            alert('아이디와 비밀번호 모두 입력하세요.');
            return;
        }

        const requestBody = { userEmail, userPassword };
        signInRequest(requestBody).then(signInResponse);
    }

    const onSignUpTextClick = () => {
        navigate('/account/sign-up');
    }

    const onSnsSignInButtonClickHandler = (type: 'kakao' | 'naver') => {
        window.location.href = SNS_SIGN_IN_URL(type);
    }

    const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key !== 'Enter') return;
        if(!passwordRef.current) return;
        passwordRef.current.focus();
    }
    const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key !== 'Enter') return;
        onButtonClickHandler();
    }

    // 버튼 활성화 조건
    const buttonClass = userEmail && userPassword ? 'button-on' : 'button-off';

    return (
        <div className='sign-up-wrapper'>
            <HeaderBox onClick={onPrevClickHandler} title='로그인'/>
            <div className='sign-up-container'>
                <div className='sign-up-content'>
                    <TitleBox title=' 배고팟 로그인' subTitle='배고팟과 함께 맛있는 한 끼!'></TitleBox>
                    <div className='sign-up-content-input-box'>
                        <InputBox ref={emailRef} title='이메일' placeholder='이메일 입력' type='text' value={userEmail}
                                  onChange={onEmailChangeHandler} onKeyDown={onEmailKeyDownHandler}/>
                        <InputBox ref={passwordRef} title='비밀번호' placeholder='비밀번호 입력' type='password'
                                  value={userPassword} message={message}
                                  onChange={onPasswordChangeHandler} onKeyDown={onPasswordKeyDownHandler}/>
                    </div>
                    <div className='text-link-container'>
                        <span className='text-link' onClick={onSignUpTextClick}>회원가입</span>&nbsp;|&nbsp;<span className='text-link'>아이디 찾기</span>&nbsp;|&nbsp;<span className='text-link'>비밀번호 찾기</span>
                    </div>
                    <div className='divide-container'>
                        <div className='divide-line'></div>
                        <div className='divide-text'>&nbsp;또는&nbsp;</div>
                        <div className='divide-line'></div>
                    </div>
                    <div>
                    <div className='social-login-container'>
                            <div className='naver-login' onClick={() => onSnsSignInButtonClickHandler('naver')}></div>
                            <div className='kakao-login' onClick={() => onSnsSignInButtonClickHandler('kakao')}></div>
                        </div>
                    </div>
                </div>
                <div className={buttonClass} onClick={onButtonClickHandler}>다음</div>
            </div>
        </div>
    )
}

export default SignIn;