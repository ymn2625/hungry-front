import {useEffect} from "react";
import {getPrivateApi} from "../../../apis/privateApi";
import {GET_USER} from "../../../apis/user/accountURL";
import ResponseCode from "../../../enums/response-code";
import {useUserInfo} from "../../../stores/user_store";
import {useNavigate} from "react-router-dom";

function MyPage (props) {
    // store
    const { userInfo, setUserInfo } = useUserInfo();

    // useEffect
    useEffect(() => {
        getPrivateApi(GET_USER()).then(getUserResponse);
    }, []);

    // response
    const getUserResponse = (responseBody) => {
        if(!responseBody) return;
        const { code } = responseBody;

        if(code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if(code !== ResponseCode.SUCCESS) return;

        setUserInfo(responseBody);
    }

    const navigate = useNavigate();
    const onButtonClickHandler = () => {
        navigate('/account/nickname');
    }

    return (
        <>
            {userInfo.userEmail};
            {userInfo.userName};
            {userInfo.userType};
            {userInfo.userNickname};
            {userInfo.userTel};
            {userInfo.userProfileImg};
            <div onClick={onButtonClickHandler}>update nickname >>></div>
        </>
    )
}

export default MyPage;