import {API_DOMAIN} from "../baseURL";

//export const PARTY_LIST = () => `${API_DOMAIN}/party/partyList`;

export const PARTY_INFO = () => `${API_DOMAIN}/party/partyInfo`;

export const PARTY_LIST = () => `${API_DOMAIN}/stores/{storeId}/parties`;

export const PARTY_MEMBERS_LIST = () => `${API_DOMAIN}/parties/{partyId}/party-member`;
export const GET_PARTIES_BY_USER_EMAIL = () => `${API_DOMAIN}/parties`;
export const GET_PARTY_MEMBERS = (partyId) => `${API_DOMAIN}/parties/${partyId}/party-member`;
export const GET_PARTY_INFO = (partyId) => `${API_DOMAIN}/parties/${partyId}`

