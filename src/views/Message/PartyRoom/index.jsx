import {useEffect, useRef, useState} from "react";
import {Stomp} from "@stomp/stompjs";
import {getPrivateApi} from "../../../apis/privateApi";
import {useNavigate, useParams} from "react-router-dom";
import {GET_MESSAGES} from "../../../apis/message/messageURL";
import ResponseCode from "../../../enums/response-code";
import './style.css';
import {GET_PARTY_INFO, GET_PARTY_MEMBERS} from "../../../apis/party/partyURL";
import OtherMessageBox from "../../../components/otherMessageBox";
import MyMessageBox from "../../../components/myMessageBox";
import MessageHeaderBox from "../../../components/messageHeaderBox";
import BoxArrow from "../../../components/bootstrapIcon/BoxArrow";
import PartyMemberBox from "../../../components/partyMemberBox";
import Arrow from "../../../components/bootstrapIcon/Arrow";

function Message() {
    // navigate
    const navigate = useNavigate();

    // useParam
    const params = useParams();

    // ref
    const stompClient = useRef(null);
    const textareaRef = useRef(null);

    // value
    const partyId = params.partyId;
    const [userEmail, setUserEmail] = useState('');
    const [messages, setMessages] = useState([]);
    const [partyMembers, setPartyMembers] = useState([]);
    const [partyInfo, setPartyInfo] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isMenu, setIsMenu] = useState(false);

    // onChange
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    // stomp
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

    // message format
    const findSender = (newMessage) => {
        let senderProfile = '';
        let senderNickname = '';

        partyMembers.forEach((item) => {
            if(newMessage.userEmail === item.userEmail) {
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
        setMessages((prevMessage) => [messageInfo, ...prevMessage]);
    }

    // api
    const getMessages = () => {
        getPrivateApi(GET_MESSAGES(partyId)).then(getMessagesResponse);
    }

    const getPartyMembers = () => {
        getPrivateApi(GET_PARTY_MEMBERS(partyId)).then(getPartyMembersResponse);
    }

    const getPartyInfo = () => {
        getPrivateApi(GET_PARTY_INFO(partyId)).then(getPartyInfoResponse);
    }

    // useEffect
    useEffect(() => {
        connect();
        getPartyInfo();
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

    const getPartyInfoResponse = (responseBody) => {
        if(!responseBody) return;
        const { code, ...data } = responseBody;
        setPartyInfo(data);

        if(code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if(code === ResponseCode.NOT_EXIST_PARTY) alert('존재하지 않는 파티입니다.');
        if(code === ResponseCode.NO_PERMISSION) alert('접근 권한이 없습니다.');
        if(code !== ResponseCode.SUCCESS) return;
    }

    // onClick
    const onClickSendMessageHandler = () => {
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

    // onKeyDown
    const onTextareaKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key !== 'Enter') return;
        if(!textareaRef.current) return;
        onClickSendMessageHandler();
    }


    const onClickMenuHandler = () => {
        setIsMenu(prevIsMenu => !prevIsMenu);
    }

    // function
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

    // class
    const buttonClass = inputValue ? 'message-button-on' : 'message-button-off';

    return (
        <div className='message-container'>
            <MessageHeaderBox onClick={onClickMenuHandler} partyInfo={partyInfo}/>
            <div className='message-list-box'>
                {messages.map((item, index) => (
                    userEmail === item.userEmail ? (
                        <MyMessageBox key={index} message={item}/>
                    ) : (
                        <OtherMessageBox key={index} message={item}/>
                    )
                ))}
            </div>
            <div className='message-textarea-box'>
                <div className='message-textarea-div'>
                    <textarea className='message-textarea' value={inputValue} onChange={handleInputChange} ref={textareaRef} onKeyDown={onTextareaKeyDownHandler}/>
                </div>
                <div className={buttonClass} onClick={onClickSendMessageHandler}>전송</div>
            </div>
            <div className={`party-member-list-box ${isMenu ? 'show' : 'hide'}`}>
                <div className='go-back-arrow-icon' onClick={onClickMenuHandler}>
                    <Arrow width={18} height={18} color={'rgba(0, 0, 0, 0.5)'}/>
                </div>
                <div className='party-member-list-title'>파티 멤버</div>
                <div className='party-member-content'>
                    {partyMembers.map((item, index) => (
                        <PartyMemberBox key={index} partyMember={item}/>
                    ))}
                </div>
                <div className='party-member-out'>
                    <div className='party-member-out-icon'>
                        <BoxArrow width={20} height={20} color={'rgba(0, 0, 0, 0.5)'}/>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Message;