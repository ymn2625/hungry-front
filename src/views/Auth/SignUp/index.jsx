import './style.css';
import {useEffect, useRef, useState} from "react";
import defaultProfileImg from "../../../assets/images/default-profile-image.jpeg";
import TitleBox from "../../../components/titleBox";
import InputBox from "../../../components/inputBox";
import HeaderBox from "../../../components/headerBox";
import {fileUploadRequest, postPublicApi} from "../../../apis/publicApi";
import {
    CHECK_CERTIFICATION_URL,
    CHECK_EMAIL_URL, SIGN_UP_URL,
    SMS_CERTIFICATION_URL
} from "../../../apis/user/authURL";
import ResponseCode from "../../../enums/response-code";
import {useLocation} from "react-router-dom";
import EmailAutoCompleteBox from "../../../components/emailAutoCompleteBox";

function SignUp(props) {

    // ref
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const nameRef = useRef(null);
    const telRef = useRef(null);
    const certificationNumberRef = useRef(null);
    const passwordCheckRef = useRef(null);
    const profileImgRef = useRef(null);
    const nicknameRef = useRef(null);

    // value
    const [step, setStep] = useState(1);

    const[emailList, setEmailList] = useState([]);
    const[showEmailList, setShowEmailList] = useState(false);
    const frequencyEmails = [
        '@naver.com',
        '@gmail.com',
        '@daum.net',
        '@hanmail.net',
        '@nate.com',
        '@kakao.com',
    ];

    const [previewImg, setPreviewImg] = useState(null);

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [userName, setUserName] = useState('');
    const [userTel, setUserTel] = useState('');
    const [certificationNumber, setCertificationNumber] = useState('');
    const [profileImg, setProfileImg] = useState(null);
    const [userNickname, setUserNickname] = useState('');
    const [userType, setUserType] = useState('app');

    // error message
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordCheckError, setPasswordCheckError] = useState('');
    const [nameError, setNameError] = useState('');
    const [telError, setTelError] = useState('');
    const [certificationNumberError, setCertificationNumberError] = useState('');

    // pattern
    const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,13}$/;
    const telPattern = /^(01[016789]{1})[0-9]{7,8}$/;
    const certificationNumberPattern = /^([0-9]{6})$/;

    // class name
    const emailPasswordButtonClass = !emailError && !passwordError && !passwordCheckError && userEmail && userPassword && passwordCheck ? 'button-on' : 'button-off';
    const nameTelButtonClass = !nameError && !telError && userName && userTel ? 'button-on' : 'button-off';
    const certificationButtonClass = !certificationNumberError && certificationNumber ? 'button-on' : 'button-off';
    const profileImgNicknameButtonClass = userNickname ? 'button-on' : 'button-off';

    // useLocation
    const location = useLocation();

    // useEffect
    useEffect(() => {
        if(location.state?.email != null || location.state?.type != null) {
            setUserEmail(location.state?.email);
            setUserType(location.state?.type);
            setUserPassword('socia@' + Math.random().toString().substring(2,6));
            setStep(2);
        }
    }, [location.state?.email, location.state?.type]);

    // onChange
    const onEmailChangeHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserEmail(value);

        setEmailListAndShowEmailList(value);

        const check = emailPattern.test(value);
        (check) ? setEmailError('') : setEmailError('이메일 형식으로 입력해주세요');
    }

    const setEmailListAndShowEmailList = (value) => {
        if(value !== '') {
            let shouldHideEmailList = false;
            if (value.includes('@')) {
                shouldHideEmailList = frequencyEmails.some((email) => email === '@' + value.split('@')[1]);
            }
            const userEmails = frequencyEmails
                .filter((email) => value.includes('@') ? email.includes('@' + value.split('@')[1]) : true)
                .map((email) => value.includes('@') ? value.split('@')[0] + email : value + email);
            setEmailList(userEmails);
            setShowEmailList(true);
            if (shouldHideEmailList) {
                setShowEmailList(false);
            }
        } else {
            setShowEmailList(false);
        }
    }

    const onPasswordChangeHandler = (event) => {
        const { value } = event.target;
        setUserPassword(value);

        if(value.length > 13) return;

        const check = passwordPattern.test(value);
        check ? setPasswordError('') : setPasswordError('영문, 숫자, 특수문자를 혼용하여 8~13자 입력해주세요');

    }

    const onPasswordCheckChangeHandler = (event) => {
        const { value } = event.target;
        setPasswordCheck(value);

        if(value.length > 13) return;

        (userPassword === value) ? setPasswordCheckError('') : setPasswordCheckError('비밀번호가 일치하지 않습니다');
    }

    const onNameChangeHandler = (event) => {
        const { value } = event.target;
        setUserName(value);
    }

    const onTelChangeHandler = (event) => {
        const { value } = event.target;
        setUserTel(value);

        if(value.length > 11) return;

        const checkTel = telPattern.test(value);
        (checkTel) ? setTelError('') : setTelError('휴대폰 번호를 다시 확인하세요');

    }

    const onCertificationChangeHandler = (event) => {
        const { value } = event.target;
        setCertificationNumber(value);

        if(value.length > 6) return;

        const checkCertificationNumber = certificationNumberPattern.test(value);
        (checkCertificationNumber) ? setCertificationNumberError('') : setCertificationNumberError('6자리 인증번호를 입력해주세요');
    }

    const onProfileImgChangeHandler = (event) => {
        if(!event.target.files || !event.target.files.length) return;
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setPreviewImg(imageUrl);
        setProfileImg(file);

        // 같은 파일 선택시 변경 안됨 방지
        if(!profileImgRef.current) return;
        profileImgRef.current.value = '';
    };

    const onNicknameChangeHandler = (event) => {
        const { value } = event.target;
        setUserNickname(value);
    }

    // onClick
    const onPrevClickHandler = () => {
        if(location.state != null && step === 2) {
            window.location.replace('http://localhost:3000/auth/sign-in');
        } else if(step === 1) {
            window.location.replace('http://localhost:3000/auth/sign-in');
        } else {
            setStep((prevStep) => prevStep - 1);
        }
    }

    const onEmailListClickHandler = (email) => {
        setUserEmail(email);
        setEmailError('');
        setShowEmailList(false);
    }

    const onEmailPasswordButtonClickHandler = () => {
        if(!userEmail || !userPassword || !passwordCheck) {
            return;
        }

        const requestBody = { userEmail };
        postPublicApi(CHECK_EMAIL_URL(), requestBody).then(checkEmailResponse);
    }

    const onNameTelButtonClickHandler = () => {
        if(!userName || !userTel) {
            return;
        }

        const requestBody = { userTel };
        postPublicApi(SMS_CERTIFICATION_URL(), requestBody).then(smsCertificationResponse);
    }

    const onCertificationButtonClickHandler = () => {
        if(!certificationNumber || !userTel) {
            return;
        }

        const requestBody = { userTel, certificationNumber };
        postPublicApi(CHECK_CERTIFICATION_URL(), requestBody).then(checkCertificationResponse);
    }

    const onProfileImgClickHandler = () => {
        if(!profileImgRef.current) return;
        profileImgRef.current.click();
    }

    const onProfileImgNicknameButtonClickHandler = async () => {
        if(!userNickname) return;

        const data = new FormData();
        data.append('file', profileImg);

        const userProfileImg = await fileUploadRequest(data);
        alert(userProfileImg);

        const requestBody = { userEmail, userPassword, userName, userTel, userProfileImg, userNickname, userType };
        postPublicApi(SIGN_UP_URL(), requestBody).then(signUpResponse);
    }

    // response
    const checkEmailResponse = (responseBody) => {
        if(!responseBody) return;
        const { code } = responseBody;

        if(code === ResponseCode.VALIDATION_FAIL) alert('이메일의 형식을 확인하세요.');
        if(code === ResponseCode.DUPLICATE_EMAIL) setEmailError('이미 존재하는 회원입니다.');
        if(code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if(code !== ResponseCode.SUCCESS) return;

        setStep(2);
    }

    const smsCertificationResponse = (responseBody) => {
        if(!responseBody) return;
        const { code } = responseBody;

        if(code === ResponseCode.VALIDATION_FAIL) alert('전화번호를 다시 확해주세요.');
        if(code === ResponseCode.MESSAGE_FAIL) setTelError('메시지 전송 오류입니다.');
        if(code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if(code !== ResponseCode.SUCCESS) return;

        setStep(3);
    }

    const checkCertificationResponse = (responseBody) => {
        if(!responseBody) return;
        const { code, userEmail } = responseBody;

        if(code === ResponseCode.VALIDATION_FAIL) alert('인증번호를 다시 확인하세요.');
        if(code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if(code === ResponseCode.CERTIFICATION_FAIL) setCertificationNumberError('인증번호가 일치하지 않습니다.')

        if(code === ResponseCode.SUCCESS && userEmail) {
            alert('이미 존재하는 회원입니다. 로그인 화면으로 이동합니다.');
            window.location.replace('http://localhost:3000/auth/sign-in');
        }

        if(code !== ResponseCode.SUCCESS) return;

        setStep(4);
    }

    const signUpResponse = (responseBody) => {
        if(!responseBody) return;
        const { code } = responseBody;

        if(code === ResponseCode.VALIDATION_FAIL) alert('회원가입 실패.');
        if(code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if(code === ResponseCode.DUPLICATE_EMAIL || code === ResponseCode.DUPLICATE_TEL) {
            alert('이미 존재하는 회원입니다.');
            window.location.replace('http://localhost:3000/auth/sign-in');
        }
        if(code !== ResponseCode.SUCCESS) return;

        window.location.replace('http://localhost:3000/auth/sign-in');
    }

    return (
        <div className='sign-up-wrapper'>
            <HeaderBox onClick={onPrevClickHandler} title='회원가입'/>
            {step === 1 &&
                <div className='sign-up-container'>
                    <div className='sign-up-content'>
                        <TitleBox title='계정 정보 입력' subTitle='사용할 이메일과 패스워드를 입력하세요.'></TitleBox>
                        <div className='sign-up-content-input-box'>
                            <InputBox ref={emailRef} title='이메일' placeholder='이메일 입력' type='text' value={userEmail}
                                      onChange={onEmailChangeHandler} message={emailError}/>
                            <EmailAutoCompleteBox emailList={emailList} showEmailList={showEmailList} onEmailListClickHandler={onEmailListClickHandler}/>
                            <InputBox ref={passwordRef} title='비밀번호' placeholder='8-13자 숫자, 문자, 특수문자 포함' type='password'
                                      value={userPassword}
                                      onChange={onPasswordChangeHandler} message={passwordError}/>
                            <InputBox ref={passwordCheckRef} title='비밀번호 확인' placeholder='비밀번호 재입력' type='password'
                                      value={passwordCheck}
                                      onChange={onPasswordCheckChangeHandler} message={passwordCheckError}/>
                        </div>
                    </div>
                    <div className={emailPasswordButtonClass} onClick={onEmailPasswordButtonClickHandler}>다음</div>
                </div>
            }
            {step === 2 &&
                <div className='sign-up-container'>
                    <div className='sign-up-content'>
                        <TitleBox title='휴대폰 인증' subTitle='최초 1회 휴대폰 인증이 필요합니다'></TitleBox>
                        <div className='sign-up-content-input-box'>
                            <InputBox ref={nameRef} title='이름' placeholder='이름 입력' type='text' value={userName}
                                      onChange={onNameChangeHandler} message={nameError}/>
                            <InputBox ref={telRef} title='휴대폰 번호' placeholder='01012341234' type='text'
                                      value={userTel}
                                      onChange={onTelChangeHandler} message={telError}/>
                        </div>
                    </div>
                    <div className={nameTelButtonClass} onClick={onNameTelButtonClickHandler}>다음</div>
                </div>
            }
            {step === 3 &&
                <div className='sign-up-container'>
                    <div className='sign-up-content'>
                        <TitleBox title='인증번호' subTitle='문자로 받은 인증번호를 입력하세요'></TitleBox>
                        <div className='sign-up-content-input-box'>
                            <InputBox ref={certificationNumberRef} title='인증번호' placeholder='인증번호 6자리 입력'
                                      type='text' value={certificationNumber}
                                      onChange={onCertificationChangeHandler} message={certificationNumberError}/>
                        </div>
                    </div>
                    <div className={certificationButtonClass} onClick={onCertificationButtonClickHandler}>다음</div>
                </div>
            }
            {step === 4 &&
                <div className='sign-up-container'>
                    <div className='sign-up-content'>
                        <TitleBox title='프로필 설정' subTitle='나를 나타내는 프로필 사진과 닉네임을 설정하세요'></TitleBox>
                        <div className='sign-up-profile-img-container'>
                            <div className='sign-up-profile-img-box' onClick={onProfileImgClickHandler}>
                                <div className='sign-up-profile-img'
                                     style={{backgroundImage: `url(${previewImg ? previewImg : defaultProfileImg})`}}>
                                    <input ref={profileImgRef} type='file' accept='image/*' style={{display: 'none'}} onChange={onProfileImgChangeHandler} />
                                </div>
                            </div>
                        </div>
                        <div className='sign-up-content-input-box'>
                            <InputBox ref={nicknameRef} title='닉네임' placeholder='닉네임 입력' type='text'
                                      value={userNickname}
                                      onChange={onNicknameChangeHandler}/>
                        </div>
                    </div>
                    <div className={profileImgNicknameButtonClass}
                         onClick={onProfileImgNicknameButtonClickHandler}>다음
                    </div>
                </div>
            }

        </div>
    )
}

export default SignUp;