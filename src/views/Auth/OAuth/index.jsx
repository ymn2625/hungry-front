import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";

function OAuth() {
    const { token, expirationTime } = useParams();
    const navigate = useNavigate();

    setTimeout(() => {
        window.localStorage.removeItem('accessToken'); // 유효시간 지나면 토큰 삭제
    }, expirationTime);

    useEffect(() => {
        if(!token || !expirationTime) return;

        window.localStorage.setItem('accessToken', token); // 엑세스 토큰 저장
        navigate('/');  // 메인 화면 이동

    }, [token]);

    return (
        <></>
    );
}

function SignUpOAuth() {
    const { userEmail, userType } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(!userEmail) return;
        navigate('/auth/sign-up', { state: { email: userEmail, type: userType} });
    })
}

export { OAuth, SignUpOAuth }