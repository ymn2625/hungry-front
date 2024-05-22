import {useRef, useState} from "react";
import ResponseCode from "../../../enums/response-code";
import {patchPrivateApi} from "../../../apis/privateApi";
import {PATCH_NICKNAME_URL} from "../../../apis/user/accountURL";
import {useUserInfo} from "../../../stores/user_store";
import {useNavigate} from "react-router-dom";
import "./style.css";
import PatchUserInfoBox from "../../../components/patchUserInfoBox";

function Nickname(props) {
    // useNavigate
    const navigate = useNavigate();

    // store
    const { userInfo} = useUserInfo();

    // ref
    const inputRef = useRef(null);

    // value
    const [value, setValue] = useState('');
    const placeholder = userInfo.userNickname;
    const mention = '새로운 닉네임을 입력해주세요';
    const title = '닉네임';

    // error message
    const [message, setMessage] = useState('');

    // class
    const buttonClass = (!message && value) ? 'button-on' : 'button-off';

    // onChange
    const onChangeHandler = (event) => {
        const { value } = event.target;
        setValue(value);

        if(value.length < 2) {
            setMessage('닉네임을 2자 이상 입력해주세요.');
        } else {
            setMessage('')
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

        if(code === ResponseCode.VALIDATION_FAIL) setMessage('닉네임을 2자 이상 입력해주세요.')
        if(code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if(code === ResponseCode.NOT_EXIST_USER) {
            alert("다시 시도해주세요!");
            navigate('/account/user');
        }
        if(code !== ResponseCode.SUCCESS) return;

        alert("성공적으로 변경되었습니다.");
        navigate('/account/user');
    }

    const onButtonClickHandler = () => {
        const userEmail = userInfo.userEmail;
        const userNickname = value;
        const requestBody = { userEmail, userNickname };
        patchPrivateApi(PATCH_NICKNAME_URL(), requestBody).then(patchNicknameResponse)
    }

    // props
    const userInfoBoxProps = {
        onPrevClickHandler,
        title,
        mention,
        inputRef,
        placeholder,
        value,
        onChangeHandler,
        message,
        buttonClass,
        onButtonClickHandler
    }

    return (
        <PatchUserInfoBox {...userInfoBoxProps}/>
    )
}

export default Nickname;