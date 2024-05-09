import axios, { request } from "axios";

axios.defaults.withCredentials = true;

const responseHandler = (response) => {
    const responseBody = response.data;
    return responseBody;
}

const errorHandler = (error) => {
    if(!error.response || !error.response.data) return null;
    const responseBody = error.response.data;
    return responseBody;
}

const DOMAIN = 'http://localhost:8088';
const API_DOMAIN = `${DOMAIN}/api/v1`;

const SIGN_IN_URL = () => `${API_DOMAIN}/account/sign-in`;

export const SNS_SIGN_IN_URL = (type: 'kakao' | 'naver') => `${API_DOMAIN}/auth/oauth2/${type}`;

export const signInRequest = async (requestBody) => {
    const result = await axios.post(SIGN_IN_URL(), requestBody)
        .then(responseHandler)
        .catch(errorHandler);
    return result;
}