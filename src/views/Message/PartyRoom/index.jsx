import {useEffect, useRef, useState} from "react";
import {Stomp} from "@stomp/stompjs";
import {getPrivateApi} from "../../../apis/privateApi";
import {useNavigate, useParams} from "react-router-dom";
import {GET_MESSAGES} from "../../../apis/message/messageURL";
import ResponseCode from "../../../enums/response-code";
import './style.css';
import {GET_PARTY_MEMBERS} from "../../../apis/party/partyURL";
import defaultProfileImg from '../../../assets/images/default-profile-image.jpeg'
import OtherMessageBox from "../../../components/other-message-box";
import MyMessageBox from "../../../components/my-message-box";

function Message() {
    // navigate
    const navigate = useNavigate();

    // useParam
    const params = useParams();

    // ref
    const stompClient = useRef(null);

    // value
    const partyId = params.partyId;
    const [userEmail, setUserEmail] = useState('');
    const [messages, setMessages] = useState([]);
    const [tempMessage, setTempMessage] = useState([]);
    const [partyMembers, setPartyMembers] = useState([]);
    const [inputValue, setInputValue] = useState('');

    // onChange
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const headers = {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'PartyId': partyId
    };

    const connect = () => {
        const socket = new WebSocket("ws://localhost:8088/ws");
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect(headers, () => {
            stompClient.current.subscribe(`/sub/parties/${partyId}`, (message) => {
                const newMessage = JSON.parse(message.body);
                console.log(newMessage);
                findSender(newMessage);
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

    const findSender = (newMessage) => {
        let senderProfile = '';
        let senderNickname = '';

        partyMembers.forEach((item) => {
            if(tempMessage.userEmail === item.userEmail) {
                senderProfile = item.userProfileImg;
                senderNickname = item.userNickname;
            }
        });
        const messageInfo = {
            messageId: newMessage.messageId,
            userEmail: newMessage.userEmail,
            userNickname: senderNickname,
            userProfileImg: senderProfile,
            content: newMessage.content,
            sendTime: newMessage.sendTime
        }
        setMessages((prevMessage) => [...prevMessage, messageInfo]);
    }

    // api
    const getMessages = () => {
        getPrivateApi(GET_MESSAGES(partyId)).then(getMessagesResponse);
    }

    const getPartyMembers = () => {
        getPrivateApi(GET_PARTY_MEMBERS(partyId)).then(getPartyMembersResponse);
    }

    // useEffect
    useEffect(() => {
        connect();
        getPartyMembers();
        getMessages();
        return () => disconnect();
    }, []);

    // response
    const getMessagesResponse = (responseBody) => {
        if(!responseBody) return;
        const { code, messageList } = responseBody;
        setMessages(messageList);

        if(code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if(code === ResponseCode.NOT_EXIST_PARTY) alert('존재하지 않는 파티입니다.');
        if(code === ResponseCode.NO_PERMISSION) alert('접근 권한이 없습니다.');
        if(code !== ResponseCode.SUCCESS) return;
    }

    const getPartyMembersResponse = (responseBody) => {
        if(!responseBody) return;
        const { code, partyMemberList, userProfile } = responseBody;
        setPartyMembers(partyMemberList);
        setUserEmail(userProfile.userEmail);

        if(code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if(code === ResponseCode.NOT_EXIST_PARTY) alert('존재하지 않는 파티입니다.');
        if(code === ResponseCode.NO_PERMISSION) alert('접근 권한이 없습니다.');
        if(code !== ResponseCode.SUCCESS) return;
    }

    // onClick
    const sendMessageClickHandler = () => {
        if(stompClient.current && inputValue) {
            const body = {
                partyId: partyId,
                userEmail: userEmail,
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
            <button onClick={sendMessageClickHandler}>전송</button>
            <div>
                {messages.map((item, index) => (
                    userEmail === item.userEmail ? (
                        <MyMessageBox key={index} message={item} />
                    ) : (
                        <OtherMessageBox key={index} message={item} />
                    )
                ))}
            </div>
        </div>

    )
}

export default Message;