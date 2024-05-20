import {useRef, useState} from "react";
import {CertificationBox, TelBox} from "../../../components/telCertificationBox";
import TitleBox from "../../../components/titleBox";
import InputBox from "../../../components/inputBox";
import {useNavigate} from "react-router-dom";
import HeaderBox from "../../../components/headerBox";
import {patchPublicApi, postPublicApi} from "../../../apis/publicApi";
import {
    AUTH_PATCH_PASSWORD_URL,
    CHECK_CERTIFICATION_URL,
    FIND_ACCOUNT_URL,
    SMS_CERTIFICATION_URL
} from "../../../apis/user/authURL";
import ResponseCode from "../../../enums/response-code";
import {useUserInfo} from "../../../stores/user_store";
import defaultProfileImg from "../../../assets/images/default-profile-image.jpeg";
import "./style.css";

function FindAccount (props) {
    // useNavigate
    const navigate = useNavigate();

    // store
    const { userInfo, setUserInfo } = useUserInfo();

    // ref
    const nameRef = useRef(null);
    const telRef = useRef(null);
    const certificationNumberRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordCheckRef = useRef(null);

    // value
    const [step, setStep] = useState(1);

    const [userPassword, setUserPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [userName, setUserName] = useState('');
    const [userTel, setUserTel] = useState('');
    const [certificationNumber, setCertificationNumber] = useState('');

    // error message
    const [passwordError, setPasswordError] = useState('');
    const [passwordCheckError, setPasswordCheckError] = useState('');
    const [nameError, setNameError] = useState('');
    const [telError, setTelError] = useState('');
    const [certificationNumberError, setCertificationNumberError] = useState('');

    // pattern
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,13}$/;
    const telPattern = /^(01[016789]{1})[0-9]{7,8}$/;
    const certificationNumberPattern = /^([0-9]{6})$/;

    // class
    const nameTelButtonClass = !nameError && !telError && userName && userTel ? 'button-on' : 'button-off';
    const certificationButtonClass = !certificationNumberError && certificationNumber ? 'button-on' : 'button-off';
    const newPasswordButtonClass = userPassword && !passwordError && passwordCheck && !passwordCheckError ? 'button-on' : 'button-off';

    // onChangeHandler
    const onPasswordChangeHandler = (event) => {
        const { value } = event.target;
        if(value.length > 13) return;
        setUserPassword(value);

        const check = passwordPattern.test(value);
        check ? setPasswordError('') : setPasswordError('영문, 숫자, 특수문자를 혼용하여 8~13자 입력해주세요');

    }

    const onPasswordCheckChangeHandler = (event) => {
        const { value } = event.target;

        if(value.length > 13) return;

        setPasswordCheck(value);

        (userPassword === value) ? setPasswordCheckError('') : setPasswordCheckError('비밀번호가 일치하지 않습니다');
    }

    const onNameChangeHandler = (event) => {
        const { value } = event.target;
        setUserName(value);
    }

    const onTelChangeHandler = (event) => {
        const { value } = event.target;
        if(value.length > 11) return;

        setUserTel(value);

        const checkTel = telPattern.test(value);
        (checkTel) ? setTelError('') : setTelError('휴대폰 번호를 다시 확인하세요');

    }

    const onCertificationChangeHandler = (event) => {
        const { value } = event.target;
        if(value.length > 6) return;

        setCertificationNumber(value);

        const checkCertificationNumber = certificationNumberPattern.test(value);
        (checkCertificationNumber) ? setCertificationNumberError('') : setCertificationNumberError('6자리 인증번호를 입력해주세요');
    }

    // onClick
    const onPrevClickHandler = () => {
        if(step === 1) {
            navigate('/auth/sign-in');
        } else {
            setStep((prevStep) => prevStep - 1);
        }
    }

    const onNameTelButtonClickHandler = () => {
        if(!userName || !userTel || nameError || telError) {
            return;
        }

        const requestBody = { userTel };
        postPublicApi(SMS_CERTIFICATION_URL(), requestBody).then(smsCertificationResponse);
    }

    const onCertificationButtonClickHandler = () => {
        if(!certificationNumber || !userTel || telError || certificationNumberError) {
            return;
        }

        const requestBody = { userName, userTel, certificationNumber };
        postPublicApi(CHECK_CERTIFICATION_URL(), requestBody).then(checkCertificationResponse);
    }

    const onNewPasswordClick = () => {
        setStep(4);
    }

    const onSignInClick = () => {
        navigate('/auth/sign-in');
    }

    const onNewPasswordClickHandler = () => {
        if(!userPassword || !passwordCheck || passwordError || passwordCheckError) {
            return;
        }
        const requestBody = { userEmail:userInfo.userEmail , userPassword  };
        patchPublicApi(AUTH_PATCH_PASSWORD_URL(), requestBody).then(patchPasswordResponse);
    }

    // response
    const smsCertificationResponse = (responseBody) => {
        if(!responseBody) return;
        const { code } = responseBody;

        if(code === ResponseCode.VALIDATION_FAIL) alert('전화번호를 다시 확해주세요.');
        if(code === ResponseCode.MESSAGE_FAIL) setTelError('메시지 전송 오류입니다.');
        if(code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if(code !== ResponseCode.SUCCESS) return;

        setStep(2);
    }

    const checkCertificationResponse = (responseBody) => {
        if(!responseBody) return;
        const { code, userEmail } = responseBody;

        if(code === ResponseCode.VALIDATION_FAIL) alert('인증번호를 다시 확인하세요.');
        if(code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if(code === ResponseCode.CERTIFICATION_FAIL) setCertificationNumberError('인증번호가 일치하지 않습니다.');
        if(code !== ResponseCode.SUCCESS) return;

        if(!userEmail) {
            alert('일치하는 계정이 없습니다. 회원가입 해주세요.');
            navigate('/auth/sign-up');
        } else {
            console.log(userEmail);
            const requestBody = { userEmail };
            postPublicApi(FIND_ACCOUNT_URL(), requestBody).then(findAccountResponse);
        }
    }

    const findAccountResponse = (responseBody) => {
        if(!responseBody) return;
        const { code } = responseBody;

        if(code === ResponseCode.VALIDATION_FAIL) alert('정보를 다시 확인해주세요'); setStep(1);
        if(code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if(code === ResponseCode.NOT_EXIST_USER) {
            alert('일치하는 계정이 없습니다. 회원가입 해주세요.');
            navigate('/auth/sign-up');
        }
        if(code !== ResponseCode.SUCCESS) return;

        setUserInfo(responseBody);
        setStep(3);
    }

    const patchPasswordResponse = (responseBody) => {
        if(!responseBody) return;
        const { code } = responseBody;

        if(code === ResponseCode.VALIDATION_FAIL) alert('비밀번호 형식을 확인하세요.');
        if(code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if(code === ResponseCode.NOT_EXIST_USER)  {
            alert('다시 시도해주세요!');
            setStep(1);
        }
        if(code !== ResponseCode.SUCCESS) return;

        alert('성공적으로 변경되었습니다.');
        navigate('/auth/sign-in');
    }

    // props
    const telBoxProps = {
        nameRef,
        userName,
        onNameChangeHandler,
        nameError,
        telRef,
        userTel,
        onTelChangeHandler,
        telError,
        nameTelButtonClass,
        onNameTelButtonClickHandler
    }

    const certificationBoxProps = {
        certificationNumberRef,
        certificationNumber,
        onCertificationChangeHandler,
        certificationNumberError,
        certificationButtonClass,
        onCertificationButtonClickHandler
    }

    return (
        <div className='sign-up-wrapper'>
            <HeaderBox onClick={onPrevClickHandler} title='계정 정보 찾기'/>
            {step === 1 && <TelBox {...telBoxProps}/>}
            {step === 2 && <CertificationBox {...certificationBoxProps}/>}
            {step === 3 &&
                <div className='sign-up-container'>
                    <div className='sign-up-content'>
                        <TitleBox title='가입된 계정 정보 확인' subTitle='가입하신 아이디를 확인하세요.'></TitleBox>
                        <div className='info-box'>
                            <div className='user-profile-img'
                                 style={{backgroundImage: `url(${userInfo.userProfileImg ? userInfo.userProfileImg : defaultProfileImg})`}}></div>
                            <div className='user-email-box'>
                                <div className='user-email'>{userInfo.userEmail}</div>
                                <div className='comment'>계정 타입 | {userInfo.userType}</div>
                            </div>
                        </div>
                        <div className='button-box'>
                            <div className='button' onClick={onNewPasswordClick}>비밀번호 재설정</div>
                            <div className='button' onClick={onSignInClick}>로그인 하기</div>
                        </div>
                    </div>
                </div>
            }
            {step === 4 &&
                <div className='sign-up-container'>
                    <div className='sign-up-content'>
                        <TitleBox title='비밀번호 재설정' subTitle='새로운 비밀번호를 설정해주세요.'></TitleBox>
                        <div className='sign-up-content-input-box'>
                            <InputBox ref={passwordRef} title='비밀번호' placeholder='8-13자 숫자, 문자, 특수문자 포함' type='password'
                                      value={userPassword}
                                      onChange={onPasswordChangeHandler} message={passwordError}/>
                            <InputBox ref={passwordCheckRef} title='비밀번호 확인' placeholder='비밀번호 재입력' type='password'
                                      value={passwordCheck}
                                      onChange={onPasswordCheckChangeHandler} message={passwordCheckError}/>
                        </div>
                    </div>
                    <div className={newPasswordButtonClass} onClick={onNewPasswordClickHandler}>비밀번호 변경</div>
                </div>
            }
        </div>
    )
}

export default FindAccount;