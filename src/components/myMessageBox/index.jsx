import './style.css'

const MyMessageBox = ({message}) => {
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

        <div className='my-message-box'>
            <div className='my-sendtime'>{formatSendTime(message.sendTime)}</div>
            <div className='my-message-content'>{message.content}</div>
        </div>
    )
}

export default MyMessageBox