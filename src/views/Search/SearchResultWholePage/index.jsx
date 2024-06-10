import React, {useEffect, useState} from "react";
import IconBack from "../../../components/bootstrapIcon/IconBack_BS";
import {useNavigate} from "react-router-dom";
import Phone from "../../../components/bootstrapIcon/Phone";
import EmptyStar from "../../../components/bootstrapIcon/EmptyStar";
import Share from "../../../components/bootstrapIcon/Share";
import Marker from "../../../components/bootstrapIcon/Marker";
import Clock from "../../../components/bootstrapIcon/Clock";
import './style.css'
import PlusCircle from "../../../components/bootstrapIcon/PlusCircle";
import party_store from "../../../stores/party_store";
import storeStore from "../../../stores/store_store";
import PartyRoomBox from "../../../components/partyRoomBox";


function SearchResultWholePage() {
    const navigate = useNavigate(); // useNavigate로 변경

    // store_store에서 storeId를 가져오기
    const { partyList } = party_store();
    const { customPartyList } = party_store();
    const setCustomPartyDetail = party_store((state) => state.setCustomPartyDetail);
    const { customPartyDetail} = party_store();

    const handleTurnBack = () =>{
        navigate(-1); // -1은 이전 페이지로 이동하는 명령입니다.
    }
    const [partyDetailToggle, setPartyDetailToggle] = useState(false);
    // 주소 세부 사항을 토글하는 함수
    const togglePartyDetail = () => {
        setPartyDetailToggle(prevState => !prevState);
    };

    const partyDetailMove = (clickedPartyId) => {
        // 검색 버튼을 클릭하면 검색 결과 페이지로 이동
        console.log(clickedPartyId + "몇?");

        const ClickedPartyDetail = customPartyList.filter(party => party.partyId === clickedPartyId)
        console.log(customPartyList[0].partyName + "어떻게들어갔니");
        console.log(ClickedPartyDetail[0].partyName+"시팔저팔");
        if(customPartyDetail ===''){
            setCustomPartyDetail(ClickedPartyDetail);
        }else{
            setCustomPartyDetail('');
        }

        //navigate(`/party/party-detail`); // useNavigate로 변경
    };

    useEffect(()=>{
        setCustomPartyDetail('');
    },[]);

    return(
        <div style={{width:'393px', height:'852px', overflow:'auto'}}>
            {/*뒤로가기, X버튼*/}
            <div style={{position:'absolute', zIndex:105}} onClick={handleTurnBack}>
                <IconBack/>
            </div>
            {/*컨텐츠 컨테이너*/}
            <div>
                {/*컨텐츠_사진*/}
                <div style={{position:'relative' , width:'393px', height:'200px' }}>
                    {/*메인 큰 사진*/}
                    <div style={{position:'absolute', left:'2px', width:'191px',height:'196px', background:'#777', display:'inline-block', marginTop:'2px'}}>사진1</div>
                    {/*작은사진 4개 컨테이너*/}
                    <div style={{position:'absolute', right:'2px', width:'196px',height:'196px', display:'inline-block', marginTop:'2px'}}>
                        <div style={{width:'97px',height:'97px', background:'#777', display:'inline-block'}}>사진2</div>
                        <div style={{width:'97px',height:'97px', background:'#777', display:'inline-block', marginLeft:'2px'}}>사진3</div>
                        <div style={{width:'97px',height:'97px', background:'#777', display:'inline-block', marginTop:'2px'}}>사진4</div>
                        <div style={{width:'97px',height:'97px', background:'#777', display:'inline-block', marginTop:'2px', marginLeft:'2px'}}>사진5</div>
                    </div>
                </div>
                {/*가게정보*/}
                <div style={{position:'relative' , width:'393px', height:'100px', padding:'20px', boxSizing:'border-box' }}>
                     <div>
                         음식점
                     </div>
                     <div style={{color:'#999', fontSize:'10px'}}>
                         중식/차이나/회식
                     </div>
                    <div>
                        <span style={{fontSize:'16px'}}>★</span><span style={{fontSize:'12px'}}>4.43</span> &nbsp; <span style={{fontSize:'10px'}}>리뷰 999+</span>
                    </div>
                </div>
                {/*파티토글*/}
                <div style={{position:'relative', background:'#ccc', width:'393px', height:'40px'}} onClick={togglePartyDetail}>
                    <div style={{position:'absolute', left:'144px', top:'8px'}}>
                        배고팟 보기 ▽
                    </div>
                    <div style={{position:'absolute', right:'20px', top:'12px', fontSize:'12px', fontWeight:'bold'}}>
                        파티 수 : {customPartyList.length}
                    </div>
                </div>
                {partyDetailToggle ? <div style={{ padding: '12px 0' }}>
                                    <div>
                                        {customPartyList.map(party => {
                                            const p1 = {
                                            partyProfileImg: null,
                                            partyTime: party.partyTime,
                                            partyName: party.partyName,
                                            partyStartTime: party.partyStartTime,
                                            partyEndTime: party.partyEndTime,
                                            partyCount: party.partyCount,
                                            partyLimit: party.partyLimit,
                                            onClickHandler: null
                                        };
                                            return <div key={party.partyId} onClick={()=>partyDetailMove(party.partyId)}><PartyRoomBox {...p1}/>
                                            {customPartyDetail !== '' && customPartyDetail[0].partyId === party.partyId && (
                                                <div style={{ width: '393px', padding: '20px 0px', background: "skyblue" }}>
                                                    소개: {customPartyDetail[0].partyDescription}<br/>
                                                    <br/>
                                                    방장:  <br/>/파티원 List<br/>/소개글
                                                </div>
                                            )}
                                            </div>
                                        })}
                                    </div>

                        {/*파티정보 상태창*/}

                 {/*       {customPartyDetail !== '' ?
                            <div style={{width: '393px',padding:'20px 0px', background: "skyblue"}}>
                                소개: {customPartyDetail[0].partyDescription}<br/>
                                <br/>
                                방장:  <br/>/파티원 List<br/>/소개글

                            </div> : ''}*/}

                        <div style={{marginTop:'18px', display:'flex',justifyContent:'center',alignItems:'center'}}>
                                        <div style={{background:'#3af', width:'200px', height:'40px', borderRadius:'20px', display:'flex',justifyContent:'center',alignItems:'center', fontSize:'18px', color:'white' }}>
                                            파티만들기 <PlusCircle w={'18px'} h={'18px'}/></div>
                                    </div>
                                </div>
                                
                    : ''}
                {/*전화, 저장, 공유*/}




                &nbsp;
                <hr/>
                <div style={{position:'relative', width:'393px', height:'80px', display:'flex', justifyContent:'center', alignItems:'center', borderBottom:'8px solid #ccc' }}>
                    <div style={{width:'40px', height:'60px'}}>
                        <div style={{width:'40px', height:'40px', background:'white', display:'flex', justifyContent:'center', alignItems:'center' }}><Phone w={'28'} h={'28'}/></div>
                        <div style={{textAlign:'center', fontSize:'10px', marginTop:'4px', fontWeight:'bold'}}>전화</div>
                    </div>
                    <div style={{width: '40px', height: '60px', margin: '0 80px'}}>
                        <div style={{width: '40px', height: '40px', background: 'white' , display:'flex', justifyContent:'center', alignItems:'center'}}><EmptyStar/></div>
                        <div style={{textAlign: 'center', fontSize: '10px', marginTop: '4px', fontWeight: 'bold'}}>저장
                        </div>
                    </div>
                    <div style={{width: '40px', height: '60px'}}>
                        <div style={{width: '40px', height: '40px', background: 'white' , display:'flex', justifyContent:'center', alignItems:'center'}}><Share/></div>
                        <div style={{textAlign: 'center', fontSize: '10px', marginTop: '4px', fontWeight: 'bold'}}>공유
                        </div>
                    </div>
                </div>
                {/*네비게이션바*/}
                <div style={{position:'relative', width:'393px', height:'52px', display:'flex', justifyContent:'center', alignItems:'center', borderBottom:'4px solid #ccc', fontWeight:'bold'}}>
                    <div style={{width:'40px', marginRight:'20px'}}>홈</div>
                    <div style={{width:'40px', margin: '0 32px'}}>리뷰</div>
                    <div style={{width:'40px', margin: '0 32px'}}>사진</div>
                    <div style={{width:'40px', marginLeft: '20px'}} onClick={handleTurnBack}>지도</div>
                </div>
                
                {/*홈*/}
                <div style={{position:'relative' , width:'393px', height:'160px', padding: '24px 20px', boxSizing:'border-box', borderBottom:'8px solid #ccc' }}>
                    <div><Marker w={'16'} h={'16'}/> <span style={{fontSize:'14px'}}>서울시 구로구 음식점있는 동네주소 1-1</span></div>
                    <br/>
                    <div><Clock w={'16'} h={'16'}/> <span style={{fontSize: '14px'}}>오늘휴무</span></div>
                    <br/>
                    <div><Phone w={'16'} h={'16'}/> <span style={{fontSize: '14px'}}>전화</span></div>
                </div>
                {/*리뷰*/}
                <div style={{position:'relative' , width:'393px', padding: '24px 20px', boxSizing:'border-box', borderBottom:'8px solid #ccc' }}>
                    <h3>리뷰</h3>
                    리뷰 리스트 출력되는 곳입니다. 페이지넘김
                    리뷰 리스트 출력되는 곳입니다. 페이지넘김
                    리뷰 리스트 출력되는 곳입니다. 페이지넘김
                    리뷰 리스트 출력되는 곳입니다. 페이지넘김
                    리뷰 리스트 출력되는 곳입니다. 페이지넘김
                    리뷰 리스트 출력되는 곳입니다. 페이지넘김
                    리뷰 리스트 출력되는 곳입니다. 페이지넘김
                    리뷰 리스트 출력되는 곳입니다. 페이지넘김
                    리뷰 리스트 출력되는 곳입니다. 페이지넘김
                    리뷰 리스트 출력되는 곳입니다. 페이지넘김
                    리뷰 리스트 출력되는 곳입니다. 페이지넘김
                </div>

                {/*사진*/}
                <div style={{position:'relative' , width:'393px', padding: '24px 20px', boxSizing:'border-box', borderBottom:'8px solid #ccc' }}>
                    <h3>사진</h3>
                    사진 리스트 출력되는 곳입니다. 페이지넘김
                    사진 리스트 출력되는 곳입니다. 페이지넘김
                    사진 리스트 출력되는 곳입니다. 페이지넘김
                    사진 리스트 출력되는 곳입니다. 페이지넘김
                    사진 리스트 출력되는 곳입니다. 페이지넘김
                    사진 리스트 출력되는 곳입니다. 페이지넘김
                    사진 리스트 출력되는 곳입니다. 페이지넘김
                    사진 리스트 출력되는 곳입니다. 페이지넘김
                    사진 리스트 출력되는 곳입니다. 페이지넘김
                    사진 리스트 출력되는 곳입니다. 페이지넘김
                </div>
                
            </div>
        </div>
    )
}

export default SearchResultWholePage;

