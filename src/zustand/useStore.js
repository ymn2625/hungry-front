import create from 'zustand';

const useStore = create((set) => ({
    searchKeyword: '',
    setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
}));

export default useStore;
