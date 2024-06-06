import { create } from 'zustand';
import {PARTY_INFO, PARTY_LIST} from "../apis/party/partyURL";
import {getPrivateApi, postPrivateApi} from "../apis/privateApi";

const party_store = create((set, get) => ({
    partyList: [],

    storeId: null, // storeId 상태 추가

    partyId: null,
    partyCount: null,
    partyLimit: null,
    partyName: '',
    partyDescription: '',
    partyTime:'',
    partyStartTime:'',
    partyEndTime:'',




    partyInfo: '',

    customPartyList: [],
    customPartyDetail: '',



    setCustomPartyDetail: (customPartyDetail) => {
        console.log("디테일 안들어왔어?" + customPartyDetail);
        set({customPartyDetail: customPartyDetail});

    },

    setCustomPartyList: (customParty) => {
        set({customPartyList: customParty});
        console.log("들어왔는가" + customParty.length);
    },

    setPartyList: async (storeId) => {
        set({ partyList: [] });
        if(storeId){
        try {
            const partyListUrl = PARTY_LIST().replace('{storeId}', storeId);

            // 서버에 검색 요청

            const response = await getPrivateApi(partyListUrl)
            // 서버로부터 받은 응답 데이터를 JSON 형식으로 파싱
            console.log(response.partyListFromServer[0].partyName + "response는 json 속에있는 배열을 넣어야함");

            const updateResponse = response.partyListFromServer;

            // 응답 데이터 유효성 검사
            if (updateResponse && Array.isArray(updateResponse) && updateResponse.length > 0) {
                // 응답 데이터가 유효하면 searchResults에 저장


                const updatedPartyList = updateResponse.map(party => ({
                /*    partyStoreId: party.partyStoreId,
                    partyId: party.partyId,
                    partyName: party.partyName,
                    partyHost: party.partyHost,
                    partyLimitNum: party.partyLimitNum,
                    partyDescription: party.partyDescription  */

                    partyStoreId: party.storeId,

                    partyId: party.partyId,
                    partyCount: party.partyCount,
                    partyLimit: party.partyLimit,
                    partyName: party.partyName,
                    partyDescription: party.partyDescription,
                    partyTime:party.partyTime,
                    partyStartTime:party.partyStartTime,
                    partyEndTime:party.partyEndTime,
                }));


                // 기존 partyList 가져오기
                const existingPartyList = get().partyList;

                // 중복된 항목 필터링
                const filteredPartyList = updatedPartyList.filter(
                    newParty => !existingPartyList.some(
                        existingParty => existingParty.partyId === newParty.partyId
                    )
                );

                set((state) => ({
                    partyList: [...state.partyList, ...filteredPartyList]
                }));
                } else {
                console.log('No data received or data is not an array');
                // 응답 데이터가 유효하지 않으면 빈 배열 설정
                set({ partyList: [] });
            }
        } catch (error) {
            console.error('Error:', error);
            // 에러가 발생하면 searchResults를 빈 배열로 설정
            set({ partyList: [] });
        }
        }
    },


    setPartyInfo: async (clickedPartyId) => {

        try {
            // 서버에 검색 요청
            const response = await postPrivateApi(PARTY_INFO(), { clickedPartyId });
            // 응답 데이터 유효성 검사
            set({partyInfo:response});

        } catch (error) {
            console.error('Error:', error);
            // 에러가 발생하면 searchResults를 빈 배열로 설정
            set({ partyInfo: '' });
        }

    },

    setPartyStoreId: (storeId) => set({ storeId }), // storeId 설정 함수
    setPartyListRemove: () => set({ partyList: [] }), // 파티 리스트 초기화 함수

}));

export default party_store;
