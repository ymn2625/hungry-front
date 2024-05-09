import axios, { request } from "axios";

axios.defaults.withCredentials = true;  // 헤더 통신 가능하도록

const responseHandler = (response) => { // 응답 데이터 반환
    const responseBody = response.data;
    return responseBody;
}

const errorHandler = (error) => {   // 응답 에러 데이터 반환
    if(!error.response || !error.response.data) return null;
    const responseBody = error.response.data;
    return responseBody;
}

const DOMAIN = 'http://localhost:8088'; // 도메인
const API_DOMAIN = `${DOMAIN}/api/v1`;  // api 도메인

// url
const SIGN_IN_URL = () => `${API_DOMAIN}/account/sign-in`;
export const SNS_SIGN_IN_URL = (type: 'kakao' | 'naver') => `${API_DOMAIN}/auth/oauth2/${type}`;

export const signInRequest = async (requestBody) => {
    const result = await axios.post(SIGN_IN_URL(), requestBody)
        .then(responseHandler)
        .catch(errorHandler);
    return result;
}