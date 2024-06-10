import defaultProfileImg from "../../assets/images/default-profile-image.jpeg";
import './style.css';
const MyPartyBox = (props) => {
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
        <div className='my-party-container'>
            <div className='party-img-box'
                 style={{backgroundImage: `url(${props.partyProfileImg ? props.partyProfileImg : defaultProfileImg})`}}>
            </div>
            <div className='party-content-container'>
                <div className='party-top'>
                    <div className='party-top-content'>
                        <div className='party-time'>{substringTime(props.partyTime)}</div>
                        <div className='party-name'>{props.partyName}</div>
                        <div className='party-count'>{props.partyCount}</div>
                    </div>
                    <div className='party-start-time'>{formatDateTime(props.partyStartTime)}</div>
                </div>
                <div className='party-message'>{props.content}</div>
            </div>
        </div>
    )
}

export default MyPartyBox;