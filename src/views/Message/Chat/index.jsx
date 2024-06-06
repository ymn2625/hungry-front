import {useEffect, useRef, useState} from "react";
import {Stomp} from "@stomp/stompjs";
import {getPrivateApi} from "../../../apis/privateApi";

function Message() {
    const stompClient = useRef(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const connect = () => {
        const socket = new WebSocket("ws://localhost:8088/ws");
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect({}, () => {
            stompClient.current.subscribe(`/sub/parties/1`, (message) => {
                const newMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
        });
    }

    const disconnect = () => {
        if(stompClient.current) {
            stompClient.current.disconnect();
        }
    }

    const getMessages = () => {
        return getPrivateApi("http://localhost:8088/api/v1/leeym26154@naver.com/parties/1").then(getMessagesResponse);
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
                content: inputValue
            }
            stompClient.current.send(`/pub/message`, {}, JSON.stringify(body));
            setInputValue('');
        }
    }

    return (
        <div>
            <input type='text' value={inputValue} onChange={handleInputChange}/>
            <button onClick={sendMessage}>전송</button>
            <div>
                {messages.map((item, index) => (
                    <div key={index} className="message-list-item">{item.content}</div>
                ))}
            </div>
        </div>
    )
}

export default Message;