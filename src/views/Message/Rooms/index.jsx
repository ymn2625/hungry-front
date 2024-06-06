import PartyRoomBox from "../../../components/partyRoomBox";

function Rooms(props) {
    const p1 = {
        partyProfileImg: null,
        partyTime: '점심',
        partyTitle: '맛도리 점심 같이 먹으실 분 오세요',
        partyStartTime: '2024.06.02 11:30',
        partyEndTime: '2024.06.02 13:30',
        partyCount: 3,
        partyLimit: 4,
        onClickHandler: null
    };

    return (
        <div>
            <PartyRoomBox {...p1} />
            <PartyRoomBox {...p1} />
            <PartyRoomBox {...p1} />
            <PartyRoomBox {...p1} />
            <PartyRoomBox {...p1} />
        </div>
    );
}

export default Rooms;