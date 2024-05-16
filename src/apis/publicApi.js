import axios from "axios";
import {errorHandler, responseHandler} from "./commonApi";
import {FILE_UPLOAD_URL} from "./baseURL";

const publicApi = axios.create({
    withCredentials: true
});

export const postPublicApi = async (url, requestBody) => {
    const result = await publicApi.post(url, requestBody)
        .then(responseHandler)
        .catch(errorHandler);
    return result;
}

export const putPublicApi = async (url, requestBody) => {
    const result = await publicApi.put(url, requestBody)
        .then(responseHandler)
        .catch(errorHandler);
    return result;
}

export const patchPublicApi = async (url, requestBody) => {
    const result = await publicApi.patch(url, requestBody)
        .then(responseHandler)
        .catch(errorHandler);
    return result;
}

export const getPublicApi = async (url) => {
    const result = await publicApi.get(url)
        .then(responseHandler)
        .catch(errorHandler);
    return result;
}

export const deletePublicApi = async (url) => {
    const result = await publicApi.delete(url)
        .then(responseHandler)
        .catch(errorHandler);
    return result;
}

// file 관련
axios.defaults.withCredentials=true;
const multipartFormData = { headers: { 'Content-Type': 'multipart/form-data' } };
export const fileUploadRequest = async (data) => {
    const result = await axios.post(FILE_UPLOAD_URL(), data, multipartFormData)
        .then(responseHandler)
        .catch(error => { return null; });
    return result;
}