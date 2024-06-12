import defaultProfileImg from "../../assets/images/default-profile-image.jpeg";
import './style.css';

const OtherMessageBox = ({message}) => {
    const formatSendTime = (sendTime) => {
        const date = new Date(sendTime);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? '오후' : '오전';
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 should be 12
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        return `${ampm} ${hours}:${minutesStr}`;
    };

    return (
        <div className='others-message-box'>
            <div className='others-message-sender-profile-img'
                 style={{backgroundImage: `url(${message.userProfileImg ? message.userProfileImg : defaultProfileImg})`}}>
            </div>
            <div className='others-nickname-message-sendtime-box'>
                <div className='others-sender-nickname'>{message.userNickname}</div>
                <div className='others-message-content-sendtime'>
                    <div className='others-message-content'>{message.content}</div>
                    <div className='others-sendtime'>{formatSendTime(message.sendTime)}</div>
                </div>
            </div>
        </div>
    )
}

export default OtherMessageBox;