import {useRef, useState} from "react";
import {postPublicApi} from "../../../apis/publicApi";
import {CHECK_CERTIFICATION_URL, SMS_CERTIFICATION_URL} from "../../../apis/user/authURL";
import ResponseCode from "../../../enums/response-code";
import {useNavigate} from "react-router-dom";
import {useUserInfo} from "../../../stores/user_store";
import TitleBox from "../../../components/titleBox";
import HeaderBox from "../../../components/headerBox";
import {CertificationBox, TelBox} from "../../../components/telCertificationBox";

function Tel (props) {
    // useNavigate
    const navigate = useNavigate();

    // store
    const { userInfo, setUserInfo } = useUserInfo();

    //ref
    const nameRef = useRef(null);
    const telRef = useRef(null);
    const certificationNumberRef = useRef(null);

    // value
    const [step, setStep] = useState(1);

    const userName = userInfo.userName;
    const [userTel, setUserTel] = useState('');
    const [certificationNumber, setCertificationNumber] = useState('');

    // error message
    const [telError, setTelError] = useState('');
    const [certificationNumberError, setCertificationNumberError] = useState('');

    // pattern
    const telPattern = /^(01[016789]{1})[0-9]{7,8}$/;
    const certificationNumberPattern = /^([0-9]{6})$/;

    // class
    const nameTelButtonClass = !telError && userName && userTel ? 'button-on' : 'button-off';
    const certificationButtonClass = !certificationNumberError && certificationNumber ? 'button-on' : 'button-off';

    // onChange
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

    // response
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
            navigate('/auth/sign-in');
        }

        if(code !== ResponseCode.SUCCESS) return;

        setStep(4);
    }

    // props
    const isReadOnly = true;
    const telBoxProps = {
        nameRef,
        userName,
        isReadOnly,
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
        <div className='tel-change-wrapper'>
            <HeaderBox onClick={onPrevClickHandler} title='휴대폰 번호 변경'/>
            {(step === 1) && <TelBox {...telBoxProps}/>}
            {(step === 2) && <CertificationBox {...certificationBoxProps}/>}
            {(step === 3) &&
                <div>

                </div>
            }
        </div>
    )
}