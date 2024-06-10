import './style.css'
import defaultProfileImg from "../../assets/images/default-profile-image.jpeg";

const PartyRoomBox = (props) => {
    const formatDateTime = (dateTime) => {
        const dateObj = new Date(dateTime);
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes().toString().padStart(2, '0');
        return `${month}/${day} ${hours}:${minutes}`;
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
                    <div className='party-title'>{props.partyTitle}</div>
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
            <div className='party-in-button' onClick={props.onClickHandler}>참여</div>
        </div>
    )
}

export default PartyRoomBox;