import React, {useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate로 변경
import './style.css';
import IconSearch from "../bootstrapIcon/IconSearch_BS"; // 스타일 파일을 불러옵니다.
import useStore from "../../stores/store_store";
import SearchInputBar from "../searchInputBar"; // 경로는 실제로 사용하는 위치에 맞게 수정하세요.

function SearchBarOnMap() {

    // store_store에서 storeId를 가져오기
    const { storeId, storeLatitude, storeLongitude } = useStore();
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
                    new naver.maps.LatLng(storeLatitude - 0.005, storeLongitude);
            }
            const map = new naver.maps.Map(mapRef.current, {
                    center: location,
                    zoom: mapZoom, // 지도 확대 정도

            });
            console.log("지도다시랜더링!");
            // 지도 이동 이벤트 핸들러 등록
            const handleMapMove = () => {
                const center = map.getCenter();
                const zoom = map.getZoom();
                setMapCenter({ latitude: center._lat, longitude: center._lng });
                setMapZoom(zoom);
                console.log("이동됨");
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

    const handleInputClick = () => {
        // SearchInputBar를 클릭하면 이전 페이지로 이동
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
                <div onClick={handleInputClick}>
                    <SearchInputBar readOnly={'readOnly'}/>
                    <div style={{position:'absolute', bottom:'114px', width:'393px', height:'300px', background:'white' }}>

                    </div>
                </div>
            )}
        </>

    );
}

export default SearchBarOnMap;
