import {API_DOMAIN} from "../baseURL";

export const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;
export const CHECK_EMAIL_URL = () => `${API_DOMAIN}/auth/check-email`;
export const SMS_CERTIFICATION_URL = () => `${API_DOMAIN}/auth/sms-certification`;
export const CHECK_CERTIFICATION_URL = () => `${API_DOMAIN}/auth/check-certification`;
export const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
export const FIND_ACCOUNT_URL = () => `${API_DOMAIN}/auth/find-account`;
export const AUTH_PATCH_PASSWORD_URL = () => `${API_DOMAIN}/auth/password`;
export const SNS_SIGN_IN_URL = (type: 'kakao' | 'naver') => `${API_DOMAIN}/auth/oauth2/${type}`;
export const REISSUE_TOKEN_URL = () => `${API_DOMAIN}/jwt/reissue`;