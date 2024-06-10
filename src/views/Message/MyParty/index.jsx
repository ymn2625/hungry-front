import MyPartyBox from "../../../components/myPartyBox";

function MyParty(props) {
    const p1 = {
        content: '내일 이 메뉴 어떠신쥐~',
        partyId: 1,
        partyCount: 3,
        partyLimit: 5,
        partyName: '떡볶이 푸파 모임이여너ㅗ러뉴먼ㄹㄷㅁ',
        partyDescription: '떡볶이 열정적으로 드실 분 찾아요~^^',
        partyImg: null,
        partyTime: '점심',
        partyStartTime: '2023-06-22 12:00:00',
        partyEndTime: '2023-06-22 13:30:00',
        storeId: 1
    };

    return (
        <div>
            <MyPartyBox {...p1}/>
        </div>
    );
}

export default MyParty;