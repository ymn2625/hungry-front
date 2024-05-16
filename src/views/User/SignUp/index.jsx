import './style.css';
import {useRef, useState} from "react";
import defaultProfileImg from "../../../assets/images/default-profile-image.jpeg";
import TitleBox from "../../../components/titleBox";
import InputBox from "../../../components/inputBox";
import HeaderBox from "../../../components/headerBox";

function SignUp(props) {
    const [step, setStep] = useState(1);

    // value
    const [userData, setUserData] = useState({
        name: '',
        tel: '',
        email: '',
        password: '',
        passwordCheck: '',
        profileImg: '',
        nickname: ''
    });

    // update value
    const updateUserData = (key, value) => {
        setUserData(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    // error
    const [errors, setErrors] = useState({
        nameError: '',
        telError: '',
        emailError: '',
        passwordError: '',
        passwordCheckError: '',
        profileImgError: '',
        nicknameError: ''
    });

    // update error
    const updateError = (key, value) => {
        setErrors(prevError => ({
            ...prevError,
            [key]: value
        }));
    };

    const onNextClickHandler = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const onPrevClickHandler = () => {
        if(step === 1) {
            // 1일때 뒤로가기 누르면 로그인 페이지로 이동 navigate()
        }
        setStep((prevStep) => prevStep - 1);
    }

    const onCompleteClickHandler = () => {

    }

    return (
        <div className='sign-up-wrapper'>
            <HeaderBox onClick={onPrevClickHandler} title='회원가입'/>
            {step === 1 && <EmailPassword userData={userData} errors={errors} updateUserData={updateUserData} updateError={updateError} onNext={onNextClickHandler}/>}
            {step === 2 && <NameTel userData={userData} errors={errors} updateUserData={updateUserData} updateError={updateError} onNext={onNextClickHandler}/>}
            {step === 3 && <Certification userData={userData} errors={errors} updateUserData={updateUserData} updateError={updateError} onNext={onNextClickHandler}/>}
            {step === 4 && <ProfileImgNickname userData={userData} errors={errors} updateUserData={updateUserData} updateError={updateError} onNext={onNextClickHandler}/>}
        </div>
    )
}

function EmailPassword({ userData, updateUserData, errors, updateError, onNext }) {
    // value
    const { email, password, passwordCheck } = userData;
    // error
    const { emailError, passwordError, passwordCheckError } = errors;

    // ref
    const emailRef  = useRef(null);
    const passwordRef = useRef(null);
    const passwordCheckRef = useRef(null);

    // button className
    const buttonClass = !emailError && !passwordError && !passwordCheckError && email && password && passwordCheck ? 'button-on' : 'button-off';

    // pattern
    const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,13}$/;

    // onChange
    const onInputChangeHandler = (key, event) => {
        const { value } = event.target;

        if (key === 'email') {
            checkEmail(value);
        }
        else if (key === 'password') {
            if(value.length > 13) return;
            checkPassword(value);
        }
        else if (key === 'passwordCheck') {
            if(value.length > 13) return;
            checkPasswordCheck(value);
        }

        updateUserData(key, value);
    }

    const checkEmail = (value) => {
        const check = emailPattern.test(value);
        if(!check) {
            updateError('emailError', '이메일 형식으로 입력해주세요');
        }
        else {
            updateError('emailError', '');
        }
    }

    const checkPassword = (value) => {
        const check = passwordPattern.test(value);
        if(!check) {
            updateError('passwordError', '영문, 숫자를 혼용하여 8~13자 입력해주세요');
        }
        else {
            updateError('passwordError', '');
        }
    }

    const checkPasswordCheck = (value) => {
        if(password !== value) {
            updateError('passwordCheckError', '비밀번호가 일치하지 않습니다');
        }
        else {
            updateError('passwordCheckError', '');
        }
    }

    // onClick
    const onButtonClickHandler = () => {
        if(!!emailError || !!passwordError || !!passwordCheckError) return;

        onNext();
    }

    return (
        <div className='sign-up-container'>
            <div className='sign-up-content'>
                <TitleBox title='계정 정보 입력' subTitle='사용할 이메일과 패스워드를 입력하세요.'></TitleBox>
                <div className='sign-up-content-input-box'>
                    <InputBox ref={emailRef} title='이메일' placeholder='이메일 입력' type='text' value={email}
                              onChange={(event) => onInputChangeHandler('email', event)} message={emailError}/>
                    <InputBox ref={passwordRef} title='비밀번호' placeholder='8-13자 숫자, 문자 포함' type='password' value={password}
                              onChange={(event) => onInputChangeHandler('password', event)} message={passwordError}/>
                    <InputBox ref={passwordCheckRef} title='비밀번호 확인' placeholder='비밀번호 재입력' type='password'
                              value={passwordCheck} onChange={(event) => onInputChangeHandler('passwordCheck', event)}
                              message={passwordCheckError}/>
                </div>
            </div>
            <div className={buttonClass} onClick={onButtonClickHandler}>다음</div>
        </div>
    )
}

function NameTel({ userData, updateUserData, errors, updateError, onNext }) {
    // value
    const { name, tel } = userData;
    // error
    const { nameError, telError } = errors;
    // ref
    const nameRef  = useRef(null);
    const telRef = useRef(null);

    // button className
    const buttonClass = !nameError && !telError && name && tel ? 'button-on' : 'button-off';

    // pattern
    const telPattern = /^(01[016789]{1})[0-9]{7,8}$/;

    // onChange
    const onInputChangeHandler = (key, event) => {
        const { value } = event.target;

        if(key === 'tel') {
            if(value.length > 11) return;
            checkTel(value);
        }

        updateUserData(key, value);
    }

    const checkTel = (value) => {
        const checkTel = telPattern.test(value);
        if(!checkTel) {
            updateError('telError', '휴대폰 번호를 다시 확인하세요');
        }
        else {
            updateError('telError', '');
        }
    }

    // onClick
    const onButtonClickHandler = () => {
        if(!!nameError || !!telError) return;

        onNext();
    }

    return (
        <div className='sign-up-container'>
            <div className='sign-up-content'>
                <TitleBox title='휴대폰 인증' subTitle='최초 1회 휴대폰 인증이 필요합니다'></TitleBox>
                <div className='sign-up-content-input-box'>
                    <InputBox ref={nameRef} title='이름' placeholder='이름 입력' type='text' value={name}
                              onChange={(event) => onInputChangeHandler('name', event)} message={nameError}/>
                    <InputBox ref={telRef} title='휴대폰 번호' placeholder='01012341234' type='text' value={tel}
                              onChange={(event) => onInputChangeHandler('tel', event)} message={telError}/>
                </div>
            </div>
            <div className={buttonClass} onClick={onButtonClickHandler}>다음</div>
        </div>
    )
}

function Certification({ userData, updateUserData, errors, updateError, onNext }) {
    // value
    const { certificationNumber } = userData;
    // error
    const { certificationNumberError } = errors;

    // ref
    const certificationNumberRef  = useRef(null);

    // button className
    const buttonClass = !certificationNumberError && certificationNumber ? 'button-on' : 'button-off';

    // pattern
    const certificationNumberPattern = /^([0-9]{6})$/;

    // onChange
    const onInputChangeHandler = (key, event) => {
        const { value } = event.target;

        if(key === 'certificationNumber') {
            if(value.length > 6) return;
            checkCertificationNumber(value);
        }

        updateUserData(key, value);
    }

    const checkCertificationNumber = (value) => {
        const checkCertificationNumber = certificationNumberPattern.test(value);
        if(!checkCertificationNumber) {
            updateError('certificationNumberError', '인증번호는 6자리 입니다');
        }
        else {
            updateError('certificationNumberError', '');
        }
    }

    // onClick
    const onButtonClickHandler = () => {
        if(!!certificationNumberError) return;

        onNext();
    }

    return (
        <div className='sign-up-container'>
            <div className='sign-up-content'>
                <TitleBox title='인증번호' subTitle='문자로 받은 인증번호를 입력하세요'></TitleBox>
                <div className='sign-up-content-input-box'>
                    <InputBox ref={certificationNumberRef} title='인증번호' placeholder='인증번호 6자리 입력' type='text' value={certificationNumber}
                              onChange={(event) => onInputChangeHandler('certificationNumber', event)} message={certificationNumberError}/>
                </div>
            </div>
            <div className={buttonClass} onClick={onButtonClickHandler}>다음</div>
        </div>
    )
}


function ProfileImgNickname({ userData, updateUserData, errors, updateError, onNext }) {
    // value
    const { profileImg, nickname } = userData;
    // error
    const { profileImgError, nicknameError } = errors;

    // ref
    const profileImgRef  = useRef(null);
    const nicknameRef  = useRef(null);

    // button className
    const buttonClass = !profileImgError && !nicknameError && nickname ? 'button-on' : 'button-off';

    // onChange
    const onInputChangeHandler = (key, event) => {
        const { value } = event.target;

        if(key === 'nickname') {
            // checkNickname(value);
        }

        updateUserData(key, value);
    }

    // const checkNickname = (value) => {
    //     if(true) {
    //         updateError('nicknameError', '중복된 닉네임입니다');
    //     }
    //     else {
    //         updateError('nicknameError', '');
    //     }
    // }

    // onClick
    const onProfileImgClickHandler = () => {
        if(!profileImgRef.current) return;
        profileImgRef.current.click();
    }
    const onButtonClickHandler = () => {
        if(!!profileImgError || !!nicknameError) return;

        onNext();
    }

    return (
        <div className='sign-up-container'>
            <div className='sign-up-content'>
                <TitleBox title='프로필 설정' subTitle='나를 나타내는 프로필 사진과 닉네임을 설정하세요'></TitleBox>
                <div className='sign-up-profile-img-container'>
                    <div className='sign-up-profile-img-box' onClick={onProfileImgClickHandler}>
                        <div className='sign-up-profile-img'
                             style={{backgroundImage: `url(${profileImg ? profileImg : defaultProfileImg})`}}></div>
                        <input ref={profileImgRef} type='file' accept='image/*' style={{display: 'none'}}/>
                    </div>
                </div>
                <div className='sign-up-content-input-box'>
                    <InputBox ref={nicknameRef} title='닉네임' placeholder='닉네임 입력' type='text' value={nickname}
                              onChange={(event) => onInputChangeHandler('nickname', event)} message={nicknameError}/>
                </div>
            </div>
            <div className={buttonClass} onClick={onButtonClickHandler}>다음</div>
        </div>
    )
}

export default SignUp;