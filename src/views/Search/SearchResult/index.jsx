import React, {useEffect, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import useStore from "../../../stores/store_store"; // 경로는 실제로 사용하는 위치에 맞게 수정하세요.
import './style.css';
import IconBack from "../../../components/bootstrapIcon/IconBack_BS";
import Marker from "../../../components/bootstrapIcon/Marker";
import StarFull from "../../../components/bootstrapIcon/StarFull"; // 스타일 파일을 import

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

                    {searchResults.map((result, index) => (
                       <div key={index}  style={{height:'108px', paddingLeft:'12px', paddingTop:'12px', position:'relative', borderBottom:'1px solid #777'}}>
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
