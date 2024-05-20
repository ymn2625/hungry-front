import {API_DOMAIN} from "../baseURL";

export const GET_USER = () => `${API_DOMAIN}/account/user`;
export const PATCH_NICKNAME_URL = () => `${API_DOMAIN}/account/nickname`;
export const PATCH_TEL_URL = () => `${API_DOMAIN}/account/tel`;
export const PATCH_PASSWORD_URL = () => `${API_DOMAIN}/account/password`;
export const PATCH_PROFILE_IMG_URL = () => `${API_DOMAIN}/account/profile-img`;