import {useState} from "react";
import ResponseCode from "../../../enums/response-code";
import {patchPrivateApi} from "../../../apis/privateApi";
import {PATCH_NICKNAME_URL} from "../../../apis/user/accountURL";

function Nickname(props) {
    const [userEmail, setUserEmail] = useState('leeym2615@naver.com');
    const [userNickname, setUserNickName] = useState('변경된 닉네임');
    const patchNicknameResponse = (responseBody) => {
        if(!responseBody) return;
        const { code } = responseBody;

        if(code === ResponseCode.SUCCESS) alert("성공적으로 변경되었습니다.");

    }

    const onButtonClickHandler = () => {
        const requestBody = { userEmail, userNickname };
        patchPrivateApi(PATCH_NICKNAME_URL(), requestBody).then(patchNicknameResponse)
    }
    return (
        <div>
            {userNickname}
            <div onClick={onButtonClickHandler}>닉네임 변경!</div>
        </div>
    )
}

export default Nickname;