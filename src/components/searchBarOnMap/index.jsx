import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate로 변경
import './style.css';
import IconSearch from "../bootstrapIcon/IconSearch_BS"; // 스타일 파일을 불러옵니다.
import useStore from "../../zustand/useStore"; // 경로는 실제로 사용하는 위치에 맞게 수정하세요.


function SearchBarOnMap() {
    const searchKeyword = useStore((state) => state.searchKeyword);
    const setSearchKeyword = useStore((state) => state.setSearchKeyword);

    const navigate = useNavigate(); // useNavigate로 변경

    const handleChange = (event) => {
        setSearchKeyword(event.target.value);
    };

    const handleSearch = () => {
        // 검색 버튼을 클릭하면 검색 결과 페이지로 이동
        navigate(`/search-results`); // useNavigate로 변경
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="음식점 검색"
                value={searchKeyword}
                onChange={handleChange}
            />
            <button className="search-button" onClick={handleSearch}><IconSearch/></button>
        </div>
    );
}

export default SearchBarOnMap;
