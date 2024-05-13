export const responseHandler = (response) => { // 응답 데이터 반환
    const responseBody = response.data;
    return responseBody;
}

export const errorHandler = (error) => {   // 응답 에러 데이터 반환
    if(!error.response || !error.response.data) return null;
    const responseBody = error.response.data;
    return responseBody;
}