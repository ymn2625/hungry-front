import React from 'react';
import {useNavigate} from 'react-router-dom';
import useStore from "../../../stores/store_store"; // 경로는 실제로 사용하는 위치에 맞게 수정하세요.
import './style.css';
import Marker from "../../../components/bootstrapIcon/Marker";
import StarFull from "../../../components/bootstrapIcon/StarFull";
import SearchInputBar from "../../../components/searchInputBar"; // 스타일 파일을 import

function SearchResults() {
    const searchResults = useStore((state) => state.searchResults); // 검색 결과 상태 추가
    const setSearchKeyword = useStore((state) => state.setSearchKeyword);
    const setStoreResult = useStore((state) => state.setStoreResult);

    const { setStoreId } = useStore(); // store_store에서 setStoreId 가져오기
    const { setStoreLatLon } = useStore(); // store_store에서 setStoreLatLon 가져오기

    const navigate = useNavigate();
    const handleResultClick = (storeId,storeName,storeLatitude,storeLongitude) => {
        setStoreId(storeId);
        setStoreLatLon(storeLatitude,storeLongitude);
        setSearchKeyword(storeName);
        setStoreResult(storeId);
        navigate(`/`); // 디테일 페이지로 이동
    };

    return (
        <div>

            <SearchInputBar/>

            {/* 검색 결과 표시 */}
            <div className="search-results-container">

                    {searchResults.map((result, index) => (
                       <div key={index} onClick={() => handleResultClick(result.storeId, result.storeName, result.storeLatitude, result.storeLongitude )} style={{height:'108px', paddingLeft:'12px', paddingTop:'12px', position:'relative', borderBottom:'1px solid #777'}}>
                           <div style={{position:'absolute', width:'40px', height:'26px'}}>
                               <Marker/>
                           </div>
                            <div style={{position:'absolute', left:'40px', width:'340px', height:'100px'}}>
                                <div style={{height:'26px', display:'flex', alignItems:'flex-end'}}>
            {/*상호명*/}               <div style={{fontSize:'20px', width:'180px', height:'26px'}}>
                                      {result.storeName}
                                     </div>
                                    <div style={{position:'absolute', right:'110px', fontSize:'14px'}}>
                                        <StarFull/> 4.43
                                    </div>
                                    <div style={{fontSize:'11px', position:'absolute', left:'250px', overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis'}}>
                                        중식/차이나/회식
                                    </div>
                                    
                                </div>
                                <div style={{marginTop:'4px', height:'22px', display:'flex', alignItems:'flex-end'}}>
            {/*영업상태*/}           <div style={{background:'#aaa', width:'72px', height:'20px' , borderRadius:'10px', alignItems:'center',display:'flex', justifyContent:'center' , fontSize:'12px', fontWeight:'bold', marginTop:'4px'}}>
                                    오늘휴무
                                    </div>
            {/*거리*/}               <div style={{position:'absolute', right:0, fontSize:'14px', color:'#777'}}>
                                        100m
                                    </div>
                                </div>
            {/*주소*/}           <div style={{fontSize:'14px', color:'#777', height:'20px', marginTop:'4px'}}>
                                    {result.storeAddress}
                                </div>
            {/*리뷰,시간,파티수*/} <div style={{marginTop:'4px', height:'22px', display:'flex', alignItems:'flex-end'}}>
                                    <div style={{position:'absolute', left:0, fontSize:'12px' }}>리뷰 999+</div>
                                    <div style={{position:'absolute', right:'110px', fontSize:'14px'}}>영업시간 9:00 ~ 18:00</div>
                                    <div style={{position:'absolute', left:'250px', background:'#aaa', width:'90px', height:'20px' , borderRadius:'10px', alignItems:'center',display:'flex', justifyContent:'center' , fontSize:'12px', fontWeight:'bold', marginTop:'4px'}}>
                                        파티 수 : 0
                                    </div>
                                </div>
                            </div>
                       </div>
                    ))}

            </div>
        </div>
    );
}

export default SearchResults;
