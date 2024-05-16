import { create } from 'zustand';
import { SEARCH_LIST } from "../apis/search/searchURL";
import { postPrivateApi } from "../apis/privateApi";

const useStore = create((set) => ({
    searchKeyword: '',
    searchResults: [],

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
                set({ searchResults: response });
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
}));

export default useStore;
