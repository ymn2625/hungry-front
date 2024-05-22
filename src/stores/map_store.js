import { create } from 'zustand';

const map_store = create((set) => {
    // 초기값 설정
    const defaultLatitude = 37.566;
    const defaultLongitude = 126.977;

    // 브라우저의 Geolocation API를 사용하여 현재 위치 가져오기
    const getCurrentPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    set({ latitude, longitude });
                },
                (error) => {
                    console.error('Error getting current position:', error);
                    set({ latitude: defaultLatitude, longitude: defaultLongitude });
                }
            );
        } else {
            // Geolocation API를 지원하지 않는 경우
            console.error('Geolocation is not supported by this browser.');
            set({ latitude: defaultLatitude, longitude: defaultLongitude });
        }
    };

    getCurrentPosition();

    return {
        // 위도 및 경도 상태
        latitude: defaultLatitude,
        longitude: defaultLongitude,

        // 위도 및 경도 설정 함수
        setLatitude: (lat) => set({ latitude: lat }),
        setLongitude: (lng) => set({ longitude: lng }),

        // 초기 상태로 재설정하는 함수
        reset: () => set({ latitude: defaultLatitude, longitude: defaultLongitude })
    };
});

export default map_store;
