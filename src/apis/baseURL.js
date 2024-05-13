export const DOMAIN = 'http://localhost:8088'; // 도메인
export const API_DOMAIN = `${DOMAIN}/api/v1`;  // api 도메인
export const FILE_DOMAIN = () => `${DOMAIN}/file`; // file 도메인
export const FILE_UPLOAD_URL = () => `${FILE_DOMAIN}/upload`; // file upload 도메인