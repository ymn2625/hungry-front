import './style.css'
import defaultProfileImg from "../../assets/images/default-profile-image.jpeg";

const PartyRoomBox = (props) => {

    const formatDateTime = (dateTime) => {
        const dateObj = new Date(dateTime);
        const now = new Date();

        // 오늘 날짜를 0시 0분 0초로 초기화
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        // 비교할 날짜를 0시 0분 0초로 초기화
        const targetDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());

        const diffInTime = targetDate.getTime() - today.getTime();
        const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

        let finishParty;
        if (diffInDays < 0) {
            finishParty = '파티 종료';
        }

        let dayString;
        if (diffInDays === 0) {
            dayString = '오늘';
        } else if (diffInDays === 1) {
            dayString = '내일';
        } else if (diffInDays === 2) {
            dayString = '모레';
        } else {
            const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
            const day = dateObj.getDate().toString().padStart(2, '0');
            dayString = `${month}/${day}`;
        }

        const hours = dateObj.getHours().toString().padStart(2, '0');
        const minutes = dateObj.getMinutes().toString().padStart(2, '0');

        return finishParty ? finishParty : `${dayString} ${hours}:${minutes}`;
    };

    const substringTime = (partyTime) => {
        const substringT = partyTime.charAt(0);
        return substringT;
    }

    return (
        <div className='party-container'>
            <div className='party-img-box'
                 style={{backgroundImage: `url(${props.partyProfileImg ? props.partyProfileImg : defaultProfileImg})`}}>
            </div>
            <div className='party-content-box'>
                <div className='party-title-box'>
                    <div className='meal-time'>{substringTime(props.partyTime)}</div>
                    <div className='party-title'>{props.partyName}</div>
                </div>
                <div className='time-box'>
                    <div className='start-time'>{formatDateTime(props.partyStartTime)}</div>
                    <div className='time-divide'>&nbsp;-&nbsp;</div>
                    <div className='end-time'>{formatDateTime(props.partyEndTime)}</div>
                </div>
                <div className='count-box'>
                    <div className='status-box'>{props.partyCount === props.partyLimit ? '모집완료' : '모집중'}&nbsp;</div>
                    <div className='count'>{props.partyCount}/{props.partyLimit}</div>
                </div>
            </div>
            <div className='party-in-button' onClick={(event)=>{ event.stopPropagation(); props.onClickHandler() }}>참여</div>
        </div>
    )
}

export default PartyRoomBox;