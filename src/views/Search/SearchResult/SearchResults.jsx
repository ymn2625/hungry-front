import React from 'react';
import { Link } from 'react-router-dom';
import useStore from "../../../zustand/useStore"; // 경로는 실제로 사용하는 위치에 맞게 수정하세요.
import './SearchResults.css'; // 스타일 파일을 import

function SearchResults() {
    const searchKeyword = useStore((state) => state.searchKeyword);

    return (
        <div>
            {/* 뒤로 가기 버튼 */}
            <Link to="/" className="back-button">뒤로 가기</Link>

            {/* 검색 결과 표시 */}
            <div className="search-results-container">
                <h2>검색 결과: {searchKeyword}</h2>
                {/* 검색 결과를 표시하는 나머지 부분을 추가 */}
            </div>
        </div>
    );
}

export default SearchResults;
