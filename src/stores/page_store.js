import { create } from 'zustand';
import {SEARCH_LIST, STORE_RESULT} from "../apis/search/searchURL";
import { postPrivateApi } from "../apis/privateApi";

const page_store = create((set) => ({

    pageNow: '',

    setPageNow: (pageNow) => set({ pageNow }), // storeId 설정 함수
   }));

export default page_store;
