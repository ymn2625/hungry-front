// SearchInputBar.js
import React, {useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate로 변경
import {Link} from 'react-router-dom';
import IconBack from "../bootstrapIcon/IconBack_BS";
import Xmark from "../bootstrapIcon/Xmark"; // 상태 가져오기
import store_store from "../../stores/store_store";
import page_store from "../../stores/page_store";

function SearchInputBar(props) {
   const {pageNow} = page_store();

    const searchKeyword = store_store((state) => state.searchKeyword);
    const setSearchKeyword = store_store((state) => state.setSearchKeyword);
    const inputRef = useRef(null); // 인풋 요소에 대한 ref
    const { setStoreId } = store_store(); // store_store에서 setStoreId 가져오기
    const navigate = useNavigate(); // useNavigate로 변경
    const { inputValue} = store_store();

    const { setInputValue } = store_store();

    useEffect(() => {
        // 컴포넌트가 마운트된 후에 인풋 요소에 포커스 설정
        inputRef.current.focus();
    }, []);

    const handleChange = (event) =>{
        console.log('Change');
        setInputValue(event.target.value);
    }
    const handleKeyUp = (event) => {
        // onChange를 쓰면 한글글자에 따라 (구록 -> 구로구 갈때 구로,구로구 두번 호출 이런식으로) 두번호출 오류가있음
        console.log("키눌렀다");
        console.log(event.target.value);

        setSearchKeyword(event.target.value);

    };

    const handleClearSearch = () => {
        setSearchKeyword(''); // 검색어를 비웁니다.
        setStoreId(null);
        setInputValue('');
    };

    const handleLinkClick = () => {
        // 링크 클릭 시, storeId를 null로 설정
        setStoreId(null);
        props.setStartStoreLocationSave(false);
        navigate(-1);
    };
    return (
        <div className="search">
            {/* 뒤로 가기 버튼 */}
            <Link to="/" onClick={handleLinkClick} className="back-button"><IconBack style={{position:"absolute", top:"6px", left:"4px"}}/></Link>

            <input
                ref={inputRef} //ref설정
                className="input-search"
                type="text"
                placeholder="장소, 음식점 검색"
                value={inputValue}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                readOnly={props.readOnly}
                onClick={props.handleInputClick}
            />
            {/* 현재 페이지가 '/'인 경우 */}
            {pageNow === '/' && searchKeyword !== '' && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '52px', height: '52px', position: 'absolute', right: '14px', top: '-2px', borderRadius: '10px' }} className="clear-button" onClick={handleClearSearch}>
                    <Xmark w={'52px'} h={'52px'} />
                </div>
            )}

            {/* 현재 페이지가 '/search-results'인 경우 */}
            {pageNow === '/search-results' && searchKeyword !== '' && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20px', height: '20px', position: 'absolute', right: '14px', top: '14px', background: '#ccc', borderRadius: '10px' }} className="clear-button" onClick={handleClearSearch}>
                    <Xmark w={'20px'} h={'20px'} />
                </div>
            )}
        </div>
    );
}

export default SearchInputBar;
