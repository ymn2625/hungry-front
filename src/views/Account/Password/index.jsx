import PatchUserInfoBox from "../../../components/patchUserInfoBox";
import InputBox from "../../../components/inputBox";
import {useNavigate} from "react-router-dom";
import {useUserInfo} from "../../../stores/user_store";
import {useRef, useState} from "react";
import {postPublicApi} from "../../../apis/publicApi";
import {CHECK_CERTIFICATION_URL, SIGN_IN_URL, SMS_CERTIFICATION_URL} from "../../../apis/user/authURL";
import {patchPrivateApi} from "../../../apis/privateApi";
import {PATCH_PASSWORD_URL} from "../../../apis/user/accountURL";
import ResponseCode from "../../../enums/response-code";

function Password (props) {
    // useNavigate
    const navigate = useNavigate();
    // store
    const { userInfo} = useUserInfo();
    // ref
    const inputRef = useRef(null);
    const newPasswordRef = useRef(null);
    // value
    const [value, setValue] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [isPasswordCheck, setIsPasswordCheck] = useState(false);

    const title = '비밀번호';
    const mention = (!isPasswordCheck) ? '현재 비밀번호를 입력해주세요' : '새로운 비밀번호를 입력해주세요';
    const placeholder = '********';
    // error message
    const [message, setMessage] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    // pattern
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,13}$/;
    // class
    const buttonClass = (!isPasswordCheck && !message && value) || (isPasswordCheck && !message && value && !newPasswordError && newPassword) ? 'button-on' : 'button-off';
    // onChange
    const onChangeHandler = (event) => {
        setIsPasswordCheck(false);

        const { value } = event.target;

        setValue(value);

        const checkPassword = passwordPattern.test(value);
        (checkPassword) ? setMessage('') : setMessage('영문, 숫자, 특수문자를 혼용하여 8~13자 입력해주세요.');
    }

    const onNewPasswordChangeHandler = (event) => {
        const { value } = event.target;

        setNewPassword(value);

        const checkNewPassword = passwordPattern.test(value);
        (checkNewPassword) ? setNewPasswordError('') : setNewPasswordError('영문, 숫자, 특수문자를 혼용하여 8~13자 입력해주세요.');
    }

    // onClick
    const onPrevClickHandler = () => {
        navigate('/account/user');
    }

    const onButtonClickHandler = () => {
        const userEmail = userInfo.userEmail;
        if (!isPasswordCheck) {
            if(!value || message) {
                return;
            }
            const requestBody = { userEmail, userPassword: value };
            postPublicApi(SIGN_IN_URL(), requestBody).then(passwordCheckResponse);
        } else {
            if(!newPassword || !value || message || newPasswordError) {
                return;
            }
            console.log(userEmail + " " + newPassword);
            const requestBody = { userEmail , userPassword: newPassword  };
            patchPrivateApi(PATCH_PASSWORD_URL(), requestBody).then(patchPasswordResponse);
        }
    }

    // response
    const passwordCheckResponse = (responseBody) => {
        if(!responseBody) return;
        const { code } = responseBody;

        if(code === ResponseCode.VALIDATION_FAIL) alert('비밀번호 형식을 확인하세요.');
        if(code === ResponseCode.SIGN_IN_FAIL) setMessage('비밀번호가 일치하지 않습니다.');
        if(code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if(code !== ResponseCode.SUCCESS) return;

        setIsPasswordCheck(true);
    }

    const patchPasswordResponse = (responseBody) => {
        if(!responseBody) return;
        const { code } = responseBody;

        if(code === ResponseCode.VALIDATION_FAIL) alert('새로운 비밀번호의 형식을 확인하세요.');
        if(code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if(code === ResponseCode.NOT_EXIST_USER)  {
            alert('다시 시도해주세요!');
            navigate('/account/user');
        }
        if(code !== ResponseCode.SUCCESS) return;

        alert('성공적으로 변경되었습니다.');
        navigate('/account/user');
    }

    // props
    const passwordBoxProps = {
        onPrevClickHandler,
        title,
        mention,
        inputRef,
        placeholder,
        value,
        type: 'password',
        onChangeHandler,
        message,
        buttonClass,
        onButtonClickHandler
    }

    const newPasswordBoxProps = {
        onPrevClickHandler,
        title,
        mention,
        inputRef: newPasswordRef,
        placeholder: '숫자, 문자, 특수기호 8자리 이상',
        value: newPassword,
        type: 'password',
        onChangeHandler: onNewPasswordChangeHandler,
        message: newPasswordError,
        buttonClass,
        onButtonClickHandler
    }

    return (
        <>
            {!isPasswordCheck && <PatchUserInfoBox {...passwordBoxProps}/>}
            {isPasswordCheck && <PatchUserInfoBox {...newPasswordBoxProps}/>}
        </>
    )
}

export default Password;