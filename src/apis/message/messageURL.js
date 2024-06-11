import {API_DOMAIN} from '../baseURL';

export const GET_MESSAGES = (partyId) => `${API_DOMAIN}/parties/${partyId}`;