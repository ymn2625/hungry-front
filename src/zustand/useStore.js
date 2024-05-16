import create from 'zustand';
import {SEARCH_LIST} from "../apis/search/searchURL";
import {postPrivateApi} from "../apis/privateApi";

const useStore = create((set) => ({
    searchKeyword: '',
    searchResults: [],

    setSearchKeyword: async (keyword) => {
        // 검색어 상태 업데이트
        set({ searchKeyword: keyword });
        try {

            const response =  await postPrivateApi(SEARCH_LIST(), { keyword });
            console.log(response.data[0].storeName); // 서버로부터 받은 데이터 출력
            // 서버로부터 받은 데이터를 searchResults 상태에 저장합니다.
            set({ searchResults: response?.data ?? [] });
        } catch (error) {
            console.error('Error:', error);
        }

    },
}));

export default useStore;

