import defaultProfileImg from "../../assets/images/default-profile-image.jpeg";
import './style.css';
const MyPartyBox = ({party, onClickHandler}) => {
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
        <div className='my-party-box' onClick={onClickHandler}>
            <div className='party-img-box'
                 style={{backgroundImage: `url(${party.partyProfileImg ? party.partyProfileImg : defaultProfileImg})`}}>
            </div>
            <div className='party-content-container'>
                <div className='party-top'>
                    <div className='party-top-content'>
                        <div className='party-time'>{substringTime(party.partyTime)}</div>
                        <div className='party-name'>{party.partyName}</div>
                        <div className='party-count'>{party.partyCount}</div>
                    </div>
                    <div className='party-start-time'>{formatDateTime(party.partyStartTime)}</div>
                </div>
                <div className='party-message'>{party.content}</div>
            </div>
        </div>
    )
}

export default MyPartyBox;