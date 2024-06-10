import {useEffect, useRef, useState} from "react";
import {Stomp} from "@stomp/stompjs";
import {getPrivateApi} from "../../../apis/privateApi";
import defaultProfileImg from "../../../assets/images/default-profile-image.jpeg";

function Message() {
    const stompClient = useRef(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const headers = {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'PartyId': 1
    };

    const connect = () => {
        const socket = new WebSocket("ws://localhost:8088/ws");
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect(headers, () => {
            stompClient.current.subscribe(`/sub/parties/1`, (message) => {
                const newMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
        }, (error) => {
            console.log('Error: ' + error.body);
        });
    }

    const disconnect = () => {
        if(stompClient.current) {
            stompClient.current.disconnect();
        }
    }

    const getMessages = () => {
        return getPrivateApi("http://localhost:8088/api/v1/parties/1").then(getMessagesResponse);
    }

    useEffect(() => {
        connect();
        getMessages();
        return () => disconnect();
    }, []);

    const getMessagesResponse = (responseBody) => {
        if(!responseBody) return;
        const { messageList } = responseBody;
        setMessages(messageList);
    }

    const sendMessage = () => {
        if(stompClient.current && inputValue) {
            const body = {
                partyId: 1,
                userEmail: "leeym26154@naver.com",
                content: inputValue,
                sendTime: getSendTime(new Date())
            }
            stompClient.current.send(`/pub/message`, headers, JSON.stringify(body));
            setInputValue('');
        }
    }

    const getSendTime = (currentDate) => {
        // 각 구성 요소를 가져오기
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();

        // 날짜와 시간을 문자열로 포맷팅
        const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        return formattedDate;
    }

    return (
        <div>
            <input type='text' value={inputValue} onChange={handleInputChange}/>
            <button onClick={sendMessage}>전송</button>
            <div>
                {messages.map((item, index) => (
                    <div key={index} className="message-list-item">
                        <div>{item.content}</div>
                        <div className='sign-up-profile-img' style={{backgroundImage: `url(${item.userProfileImg ? item.userProfileImg : defaultProfileImg})`}}></div>
                        <div>{item.userNickname}</div>
                        <div>{item.sendTime}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Message;