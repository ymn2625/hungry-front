import React, {useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate로 변경
import './style.css';
import IconSearch from "../../../components/bootstrapIcon/IconSearch_BS"; // 스타일 파일을 불러옵니다.
import useStore from "../../../stores/store_store";
import SearchInputBar from "../../../components/searchInputBar";
import StarFull from "../../../components/bootstrapIcon/StarFull";
import party_store from "../../../stores/party_store";
import partyStore from "../../../stores/party_store";
import page_store from "../../../stores/page_store"; // 경로는 실제로 사용하는 위치에 맞게 수정하세요.

function SearchBarOnMap() {
    const {setPageNow} = page_store();

    // store_store에서 storeId를 가져오기
    const { storeId, storeLatitude, storeLongitude, storeResult } = useStore();
    const setSearchKeyword = useStore((state) => state.setSearchKeyword);

    const mapRef = useRef(null); // useRef를 이 컴포넌트 내에서 사용
    // 실시간 위치를 저장할 상태
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 37.566,
        longitude: 126.977
    });
    const navigate = useNavigate(); // useNavigate로 변경


    const [mapCenter, setMapCenter] = useState({ latitude: 0, longitude: 0 });
    const [mapZoom, setMapZoom] = useState(15);

    const [startStoreLocationSave, setStartStoreLocationSave] = useState(false);
    const [addressDetail, setAddressDetail] = useState(false);
    // 주소 세부 사항을 토글하는 함수
    const toggleAddressDetail = () => {
        setAddressDetail(prevState => !prevState);
    };

    const { partyList } = party_store();
    const setCustomPartyList = partyStore((state) => state.setCustomPartyList);

    useEffect(()=>{
     setPageNow('/')
    },[]);

    useEffect(() => {
        // 브라우저의 Geolocation API를 사용하여 현재 위치 가져오기
        const watchPositionId = navigator.geolocation.watchPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setCurrentLocation({ latitude, longitude });
            },
            (error) => {
                console.error('Error getting current position:', error);
            }
        );

        // 컴포넌트가 언마운트될 때 위치 추적 중지
        return () => {
            navigator.geolocation.clearWatch(watchPositionId);
        };
    }, []);

    useEffect(() => {

        const { naver } = window;


        if (mapRef.current && naver) {
            let location;
            if (storeId === null) {
                location = mapCenter.latitude !== 0 && mapCenter.longitude !== 0 ?
                    new naver.maps.LatLng(mapCenter.latitude, mapCenter.longitude) :
                    new naver.maps.LatLng(currentLocation.latitude, currentLocation.longitude);
            } else {
                location = mapCenter.latitude !== 0 && mapCenter.longitude !== 0 ?
                    new naver.maps.LatLng(mapCenter.latitude, mapCenter.longitude) :
                    new naver.maps.LatLng(storeLatitude - 0.002, storeLongitude);
            }
            const map = new naver.maps.Map(mapRef.current, {
                    center: location,
                    zoom: mapZoom, // 지도 확대 정도

            });
            // 지도 이동 이벤트 핸들러 등록
            const handleMapMove = () => {
                const center = map.getCenter();
                const zoom = map.getZoom();
                setMapCenter({ latitude: center._lat, longitude: center._lng });
                setMapZoom(zoom);
            };

            // 이벤트 리스너 등록
            naver.maps.Event.addListener(map, 'idle', handleMapMove);

            // 내 위치를 나타내는 파란색 원 모양의 마커 생성
            const currentMarker = new naver.maps.Marker({
                position: new naver.maps.LatLng(currentLocation.latitude, currentLocation.longitude),
                map,
                icon: {
                    content: '<div style="width: 12px; height: 12px; background-color: #fff; border:4px solid #0073ff; border-radius: 50%;"></div>',
                    anchor: new naver.maps.Point(10, 10), // 마커의 중심점
                },
            });

            // storeId가 존재할 때 가게 위치 마커 생성
            if (storeId !== null) {
                const storeLocation = new naver.maps.LatLng(storeLatitude, storeLongitude);
                new naver.maps.Marker({
                    position: storeLocation,
                    map,

                });
                if(startStoreLocationSave == false) {
                    const center = map.getCenter();
                    const zoom = map.getZoom();
                    setMapCenter({latitude: center._lat, longitude: center._lng});
                    setMapZoom(zoom);
                }
                setStartStoreLocationSave(true);
            }
            // clean-up 함수
            return () => {
                // 이전에 등록된 이벤트 리스너 제거
                naver.maps.Event.removeListener(mapRef.map , 'idle', handleMapMove);
            };
        }

    }, [currentLocation, storeId, mapZoom, mapCenter]);


    const handleSearch = () => {
        // 검색 버튼을 클릭하면 검색 결과 페이지로 이동
        setSearchKeyword('');
        navigate(`/search-results`); // useNavigate로 변경
    };

    const handleResultWholePage = () => {
        setCustomPartyList(partyList.filter(party => party.partyStoreId === storeId));
        // 검색 결과를 누르면 전체 페이지로 이동
        navigate(`/search-result-whole-page`); // useNavigate로 변경
    };

    const handleInputClick = () => {
        // SearchInputBar를 클릭하면 이전 페이지로 이동
        setStartStoreLocationSave(false);
        navigate(-1); // -1은 이전 페이지로 이동하는 명령입니다.
    };

    return (
        <>
            {/* map관련 */}
            <div ref={mapRef} style={{width: "393px", height: "737px"}}></div>


            {/* storeId가 공백인 경우에만 input 요소를 클릭하면 SearchInputBar를 보여줍니다. */}
            {storeId === null ? (
                <div className="search-bar">
                    <input className="input-button"
                           type="text"
                           placeholder="장소, 음식점 검색"

                           onClick={handleSearch}
                    />
                    <button className="search-button" onClick={handleSearch}><IconSearch/></button>
                </div>
            ) : (
                // storeId가 공백이 아닌 경우에는 SearchInputBar를 띄웁니다.
                <div /*onClick={handleInputClick}*/>
                    <SearchInputBar readOnly={'readOnly'} handleInputClick={handleInputClick} setStartStoreLocationSave={setStartStoreLocationSave}/>

                    <div style={{
                        position: 'absolute',
                        bottom: '114px',
                        width: '393px',
                        height: '220px',
                        background: 'white',
                        zIndex: 100,
                        borderTopLeftRadius: '20px',
                        borderTopRightRadius: '20px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
                    }}>
                        <div style={{position:'absolute',width:'393px',height:'172px', zIndex:103}} onClick={handleResultWholePage}></div>
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'14px', marginBottom:'14px'}}>
                            <div style={{width:'100px', height:'6px', borderRadius:'3px', background:'#ccc'}}></div>
                        </div>
                        <div style={{position: 'absolute', left: '20px', width: '353px', height: '100px'}}>
                            <div style={{height: '26px', display: 'flex', alignItems: 'flex-end'}}>
                                {/*상호명*/}
                                <div style={{fontSize: '20px', width: '180px', height: '26px'}}>
                                    {storeResult.storeName}
                                </div>


                            </div>
                            <div
                                style={{marginTop: '4px', height: '22px', display: 'flex', alignItems: 'flex-end'}}>

                                <div style={{
                                    fontSize: '14px',
                                    position: 'absolute',
                                    left: 0,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#999'
                                }}>
                                    중식/차이나/회식
                                </div>

                            </div>
                            {/*주소*/}
                            <div style={{
                                fontSize: '14px',
                                color: 'black',
                                width: '280px',
                                height: '20px',
                                marginTop: '12px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>
                                {storeResult.storeDescription}
                            </div>
                            {/*리뷰,시간,파티수*/}
                            <div
                                style={{marginTop: '4px', height: '22px', display: 'flex', alignItems: 'flex-end'}}>
                                {/*영업상태*/}
                                <div style={{
                                    background: '#aaa',
                                    width: '72px',
                                    height: '20px',
                                    borderRadius: '10px',
                                    alignItems: 'center',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    marginTop: '4px'
                                }}>
                                    오늘휴무
                                </div>
                                <div style={{position: 'absolute', left: '80px', fontSize: '14px'}}>
                                    영업시간 9:00 ~ 18:00
                                </div>

                            </div>
                            <div
                                style={{marginTop: '4px', height: '22px', display: 'flex', alignItems: 'flex-end'}}>
                                <div style={{position: 'absolute', left: 0, fontSize: '14px'}}>
                                    <StarFull/> 4.43
                                </div>
                                <div style={{position: 'absolute', left: '60px', fontSize: '12px'}}>리뷰 999+</div>

                            </div>
                            <div
                                style={{marginTop: '4px', height: '22px', display: 'flex', alignItems: 'flex-end'}}>
                                {/*거리*/}
                                <div style={{position: 'absolute', left: 0, fontSize: '14px', color: '#777'}}>
                                    100m
                                </div>
                                {/*주소*/}
                                <div style={{
                                    position: 'absolute',
                                    left: '60px',
                                    fontSize: '14px',
                                    color: 'black',
                                    width: '100px',
                                    height: '20px',
                                    marginTop: '12px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }} onClick={toggleAddressDetail}>
                                    ▽{storeResult.storeAddress}
                                </div>
                                <div style={{
                                    position: 'absolute',
                                    right: '0px',
                                    background: '#aaa',
                                    width: '90px',
                                    height: '20px',
                                    borderRadius: '10px',
                                    alignItems: 'center',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    marginTop: '4px'
                                }}>
                                    파티 수 : {partyList.filter(party => party.partyStoreId === storeId).length}
                                </div>
                            </div>
                            <div style={{position:'absolute', right:0, top:0 , width:'72px', height:'72px', background:'black', borderRadius:'12px'}}>
                                사진
                            </div>

                        </div>

                    </div>
                    {addressDetail ?

                        <div style={{position:'absolute', left:0, top:0, width:'393px', height:'852px', zIndex:101 }} onClick={()=>setAddressDetail(false)}>
                            <div
                                style={{position:'absolute', bottom:'60px', left:'15px',  width: '353px', height: '68px', background: 'white', border: '1px solid blue', padding:'4px'}}>
                                {storeResult.storeAddress}
                            </div>
                        </div> : ''
                    }
                </div>
            )}
        </>

    );
}

export default SearchBarOnMap;
