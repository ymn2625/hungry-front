import axios from "axios";
import ResponseCode from "../enums/response-code";
import {errorHandler, responseHandler} from "./commonApi";
import {getPublicApi} from "./publicApi";
import {REISSUE_TOKEN_URL} from "./user/authURL";

const privateApi = axios.create({
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
});

privateApi.interceptors.request.use(
    (config) => {
        config.withCredentials = true;
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`

        return config;
    },
    (error) => {
        Promise.reject(error);
    }
)

privateApi.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if(error.response.data.code === ResponseCode.EXPIRED_TOKEN) {
            const originRequest = error.config;

            const responseBody = await getPublicApi(REISSUE_TOKEN_URL());

            if(!responseBody) return;
            const { code, token, expirationTime } = responseBody;

            if(code === ResponseCode.REISSUE_FAIL || code === ResponseCode.NO_PERMISSION) {
                alert('다시 로그인 해주세요!');
                localStorage.removeItem('accessToken');
                window.location.replace('http://localhost:3000/auth/sign-in');
            }

            window.localStorage.setItem('accessToken', token);
            setTimeout(() => {
                window.localStorage.removeItem('accessToken');
            }, expirationTime);

            originRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originRequest);
        } else if (error.response.data.code === ResponseCode.ROLE_ERROR) {
            alert('권한이 없습니다!');
        }
        return Promise.reject(error);
    }
)

export const postPrivateApi = async (url, requestBody) => {
    const result = await privateApi.post(url, requestBody)
        .then(responseHandler)
        .catch(errorHandler);
    return result;
}

export const putPrivateApi = async (url, requestBody) => {
    const result = await privateApi.put(url, requestBody)
        .then(responseHandler)
        .catch(errorHandler);
    return result;
}

export const patchPrivateApi = async (url, requestBody) => {
    const result = await privateApi.patch(url, requestBody)
        .then(responseHandler)
        .catch(errorHandler);
    return result;
}

export const getPrivateApi = async (url) => {
    const result = await privateApi.get(url)
        .then(responseHandler)
        .catch(errorHandler);
    return result;
}

export const deletePrivateApi = async (url) => {
    const result = await privateApi.delete(url)
        .then(responseHandler)
        .catch(errorHandler);
    return result;
}