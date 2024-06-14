import MyPartyBox from "../../../components/myPartyBox";
import './style.css';
import Footer from "../../../components/footer";
import {useEffect, useState} from "react";
import {getPrivateApi} from "../../../apis/privateApi";
import {GET_PARTIES_BY_USER_EMAIL} from "../../../apis/party/partyURL";
import ResponseCode from "../../../enums/response-code";
import {useNavigate} from "react-router-dom";

function MyParty(props) {
    // value
    const [myPartyList, setMyPartyList] = useState([]);

    // navigate
    const navigate = useNavigate();

    // useEffect
    useEffect(() => {
        getPrivateApi(GET_PARTIES_BY_USER_EMAIL()).then(getPartyListByUserResponse);
    }, []);

    // response
    const getPartyListByUserResponse = (responseBody) => {
        if(!responseBody) return;
        const { code, partyListItem } = responseBody;
        setMyPartyList(partyListItem);
        console.log(partyListItem[0]+"뭐가좀 들어왔어?");

        if(code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if(code === ResponseCode.NOT_EXIST_USER) alert('존재하지 않는 회원입니다');
        if(code !== ResponseCode.SUCCESS) return;
    }

    return (
        <div className='my-party-container'>
            <div className='my-party-title'>파티</div>
            <div className='my-party-list-box'>
                {myPartyList.length !== 0 ?
                    (myPartyList.map((party) => (
                        <MyPartyBox
                            key={party.partyId}
                            party={party}
                            onClickHandler={() => navigate(`/parties/${party.partyId}`)}
                        />
                    ))) :
                    (<div className='no-party-list'>
                        파티가 존재하지 않습니다!
                    </div>)
                }
            </div>
            <Footer/>
        </div>
    )
}

export default MyParty;