import { create } from 'zustand';

const defaultState = {
    userEmail: '',
    userType: '',
    userName: '',
    userTel: '',
    userProfileImg: '',
    userNickname: '',
}
export const useUserInfo = create ((set) => ({
    userInfo: defaultState,
    setUserInfo: (userInfo) => {set({ userInfo })},
    deleteUserInfo: () => {set({userInfo: defaultState})}
}))
