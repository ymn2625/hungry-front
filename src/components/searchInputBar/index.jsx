// SearchInputBar.js
import React, {useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate로 변경
import {Link} from 'react-router-dom';
import IconBack from "../bootstrapIcon/IconBack_BS";
import Xmark from "../bootstrapIcon/Xmark"; // 상태 가져오기
import store_store from "../../stores/store_store";

function SearchInputBar(props) {
    const searchKeyword = store_store((state) => state.searchKeyword);
    const setSearchKeyword = store_store((state) => state.setSearchKeyword);
    const inputRef = useRef(null); // 인풋 요소에 대한 ref
    const { setStoreId } = store_store(); // store_store에서 setStoreId 가져오기
    const navigate = useNavigate(); // useNavigate로 변경

    useEffect(() => {
        // 컴포넌트가 마운트된 후에 인풋 요소에 포커스 설정
        inputRef.current.focus();
    }, []);



    const handleChange = (event) => {
        setSearchKeyword(event.target.value);
    };

    const handleClearSearch = () => {
        setSearchKeyword(''); // 검색어를 비웁니다.
        setStoreId(null);
    };

    const handleLinkClick = () => {
        // 링크 클릭 시, storeId를 null로 설정
        setStoreId(null);
        props.setStartStoreLocationSave(false);
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
                value={searchKeyword}
                onChange={handleChange}
                readOnly={props.readOnly}
                onClick={props.handleInputClick}
            />
            {searchKeyword !== '' && ( // 검색어가 비어있지 않은 경우에만 x 표시 버튼을 표시
                <div style={{width:'20px',height:'20px', position:'absolute', right:'14px', top:'14px', background:'#ccc', borderRadius:'10px'}} className="clear-button" onClick={handleClearSearch}> <Xmark/> </div>
            )}
        </div>
    );
}

export default SearchInputBar;
