import PartyRoomBox from "../../../components/partyBox";

function Rooms(props) {
    const p1 = {
        partyProfileImg: null,
        partyTime: '점심',
        partyTitle: '맛도실 분 오세요',
        partyStartTime: '2024.06.02 11:30',
        partyEndTime: '2024.06.02 13:30',
        partyCount: 3,
        partyLimit: 4,
        onClickHandler: null
    };
    const p2 = {
        partyProfileImg: null,
        partyTime: '점심',
        partyTitle: '맛도실 분 오세요 짱 맛있을 예정입니다~ ',
        partyStartTime: '2024.06.02 11:30',
        partyEndTime: '2024.06.02 13:30',
        partyCount: 3,
        partyLimit: 4,
        onClickHandler: null
    };

    return (
        <div>
            <PartyRoomBox {...p1} />
            <PartyRoomBox {...p2} />
            <PartyRoomBox {...p1} />
            <PartyRoomBox {...p1} />
            <PartyRoomBox {...p1} />
        </div>
    );
}

export default Rooms;