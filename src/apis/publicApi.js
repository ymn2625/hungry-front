import axios from "axios";
import {errorHandler, responseHandler} from "./commonApi";

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