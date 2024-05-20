import {useRef, useState} from "react";
import {postPublicApi} from "../../../apis/publicApi";
import {CHECK_CERTIFICATION_URL, SMS_CERTIFICATION_URL} from "../../../apis/user/authURL";
import ResponseCode from "../../../enums/response-code";
import {useNavigate} from "react-router-dom";
import {useUserInfo} from "../../../stores/user_store";
import {patchPrivateApi} from "../../../apis/privateApi";
import PatchUserInfoBox from "../../../components/patchUserInfoBox";
import InputBox from "../../../components/inputBox";
import {PATCH_TEL_URL} from "../../../apis/user/accountURL";

function Tel (props) {
    // useNavigate
    const navigate = useNavigate();

    // store
    const { userInfo} = useUserInfo();

    //ref
    const inputRef = useRef(null);
    const certificationNumberRef = useRef(null);

    // value
    const [sendMessage, setSendMessage] = useState(false);

    const [value, setValue] = useState('');
    const [certificationNumber, setCertificationNumber] = useState('');

    const title = '전화번호';
    const mention = '새로운 전화번호를 입력해주세요';
    const placeholder = userInfo.userTel;

    // error message
    const [message, setMessage] = useState('');
    const [certificationNumberError, setCertificationNumberError] = useState('');

    // pattern
    const telPattern = /^(01[016789]{1})[0-9]{7,8}$/;
    const certificationNumberPattern = /^([0-9]{6})$/;

    // class
    const buttonClass = (!sendMessage && !message && value) || (sendMessage && !message && value && !certificationNumberError && certificationNumber) ? 'button-on' : 'button-off';

    // onChange
    const onChangeHandler = (event) => {
        setSendMessage(false);

        const { value } = event.target;
        if(value.length > 11) return;

        setValue(value);

        const checkTel = telPattern.test(value);
        (checkTel) ? setMessage('') : setMessage('휴대폰 번호를 다시 확인하세요');
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
        navigate('/account/user');
    }

    const onButtonClickHandler = () => {
        const userTel = value;
        const userName = userInfo.userName;
        if (!sendMessage) {
            if(!value || message) {
                return;
            }
            const requestBody = { userTel };
            postPublicApi(SMS_CERTIFICATION_URL(), requestBody).then(smsCertificationResponse);
        } else {
            if(!certificationNumber || !value || message || certificationNumberError) {
                return;
            }
            const userTel = value;
            const requestBody = { userName, userTel, certificationNumber };
            postPublicApi(CHECK_CERTIFICATION_URL(), requestBody).then(checkCertificationResponse);
        }
    }

    // response
    const smsCertificationResponse = (responseBody) => {
        if(!responseBody) return;
        const { code } = responseBody;

        if(code === ResponseCode.VALIDATION_FAIL) alert('전화번호를 다시 확인해주세요.');
        if(code === ResponseCode.MESSAGE_FAIL) message('메시지 전송 오류입니다.');
        if(code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if(code !== ResponseCode.SUCCESS) return;

        setSendMessage(true);
    }

    const checkCertificationResponse = (responseBody) => {
        if(!responseBody) return;
        const { code, userEmail } = responseBody;

        if(code === ResponseCode.VALIDATION_FAIL) {
            alert('다시 시도해주세요. checkcertification');
            navigate('/account/user');
        }
        if(code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if(code === ResponseCode.CERTIFICATION_FAIL) setCertificationNumberError('인증번호가 일치하지 않습니다.');

        if(code !== ResponseCode.SUCCESS) return;

        if(userEmail && (userEmail !== userInfo.userEmail)) {
            alert('이미 존재하는 전화번호입니다.');
            navigate('/account/user');
            return;
        }

        if(code === ResponseCode.SUCCESS) {
            const requestBody = { userEmail:userInfo.userEmail, userTel:value };
            patchPrivateApi(PATCH_TEL_URL(), requestBody).then(patchTelResponse);
        }
    }

    const patchTelResponse = (responseBody) => {
        if(!responseBody) return;
        const { code } = responseBody;

        if(code === ResponseCode.VALIDATION_FAIL || code === ResponseCode.NOT_EXIST_USER) {
            alert('다시 시도해주세요.');
            navigate('/account/user');
        }
        if(code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if(code !== ResponseCode.SUCCESS) return;

        if(code === ResponseCode.SUCCESS) {
            alert('성공적으로 변경되었습니다.');
            navigate('/account/user');
        }
    }

    // props
    const telBoxProps = {
        onPrevClickHandler,
        title,
        mention,
        inputRef,
        placeholder,
        value,
        onChangeHandler,
        message,
        buttonClass,
        onButtonClickHandler,
        children: sendMessage ? (
            <InputBox
                ref={certificationNumberRef}
                title='인증번호'
                placeholder='인증번호 6자리 입력'
                type='text'
                value={certificationNumber}
                onChange={onCertificationChangeHandler}
                message={certificationNumberError}
            />
        ) : null
    }

    return (
        <PatchUserInfoBox {...telBoxProps}/>
    )
}

export default Tel;