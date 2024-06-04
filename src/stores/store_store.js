import { create } from 'zustand';
import {SEARCH_LIST, STORE_RESULT} from "../apis/search/searchURL";
import { postPrivateApi } from "../apis/privateApi";

const store_store = create((set) => ({
    searchKeyword: '',
    searchResults: [],
    storeId: null, // storeId 상태 추가
    storeResult: '',
    storeLatitude: null, // 상점 위도 추가
    storeLongitude: null, // 상점 경도 추가


    setSearchKeyword: async (keyword) => {
        // 검색어 상태 업데이트
        set({ searchKeyword: keyword });

        try {
            // 서버에 검색 요청
            const response = await postPrivateApi(SEARCH_LIST(), { keyword });
            console.log(response);
            // 응답 데이터 유효성 검사
            if (response && Array.isArray(response)) {
                // 응답 데이터가 유효하면 searchResults에 저장
                if(keyword !== '') {
                    set({searchResults: response});
                }else{
                    set({ searchResults: [] });
                }
                if (response.length > 0) {
                    console.log(response[0].storeName); // 첫 번째 아이템 출력
                } else {
                    console.log('Received empty array');
                }
            } else {
                console.log('No data received or data is not an array');
                // 응답 데이터가 유효하지 않으면 빈 배열 설정
                set({ searchResults: [] });
            }
        } catch (error) {
            console.error('Error:', error);
            // 에러가 발생하면 searchResults를 빈 배열로 설정
            set({ searchResults: [] });
        }

    },


    setStoreResult: async (storeId) => {
        // 검색어 상태 업데이트

        try {
            // 서버에 검색 요청
            const response = await postPrivateApi(STORE_RESULT(), { storeId });
            // 응답 데이터 유효성 검사
            set({storeResult:response});

        } catch (error) {
            console.error('Error:', error);
            // 에러가 발생하면 searchResults를 빈 배열로 설정
            set({ storeResult: '' });
        }

    },


    setStoreId: (storeId) => set({ storeId }), // storeId 설정 함수
    // 상점의 위도 및 경도 설정 함수
    setStoreLatLon: (latitude, longitude) => set({ storeLatitude: latitude, storeLongitude: longitude })
}));

export default store_store;
