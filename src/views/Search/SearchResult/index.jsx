import React, {useEffect, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import useStore from "../../../zustand/useStore"; // 경로는 실제로 사용하는 위치에 맞게 수정하세요.
import './style.css';
import IconBack from "../../../components/bootstrapIcon/IconBack_BS"; // 스타일 파일을 import

function SearchResults() {
    const searchKeyword = useStore((state) => state.searchKeyword);
    const searchResults = useStore((state) => state.searchResults); // 검색 결과 상태 추가
    const setSearchKeyword = useStore((state) => state.setSearchKeyword);
    const inputRef = useRef(null); // 인풋 요소에 대한 ref


    const handleChange = (event) => {
        setSearchKeyword(event.target.value);
    };

    useEffect(() => {
        // 컴포넌트가 마운트된 후에 인풋 요소에 포커스 설정
        inputRef.current.focus();
    }, []);


    return (
        <div>
            <div className="search">
            {/* 뒤로 가기 버튼 */}
            <Link to="/" className="back-button"><IconBack style={{position:"absolute", top:"6px", left:"4px"}}/></Link>

            <input
                ref={inputRef} //ref설정
                className="input-search"
                type="text"
                placeholder="장소, 음식점 검색"
                value={searchKeyword}
                onChange={handleChange}
            />
            </div>

            {/* 검색 결과 표시 */}
            <div className="search-results-container">
                <h2>검색 결과: {searchKeyword}</h2>
                {/* 검색 결과를 표시하는 나머지 부분을 추가 */}
                <ul>
                    {searchResults.map((result, index) => (
                        <li key={index}>{result.storeName}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SearchResults;
