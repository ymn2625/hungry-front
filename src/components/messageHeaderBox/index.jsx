import defaultProfileImg from "../../assets/images/default-profile-image.jpeg";
import Person from "../bootstrapIcon/Person";
import Menu from "../bootstrapIcon/Menu";
import './style.css'
import Arrow from "../bootstrapIcon/Arrow";
import {useNavigate} from "react-router-dom";

const MessageHeaderBox = ({onClick, partyInfo}) => {
    const navigate = useNavigate();
    const onClickHandler = () => {
        navigate('/parties');
    }
    return (
        <div className='message-header'>
            <div className='message-party-info-box'>
                <div className='arrow-icon' onClick={onClickHandler}>
                    <Arrow width={20} height={22} color={'rgba(0, 0, 0, 0.5)'}/>
                </div>
                <div className='party-img-box'
                     style={{backgroundImage: `url(${partyInfo.partyImg ? partyInfo.partyImg : defaultProfileImg})`}}>
                </div>
                <div className='message-party-name-count'>
                    <div className='message-party-name'>{partyInfo.partyName}</div>
                    <div className='message-party-count'>
                        <Person width={14} height={14} color={'rgba(0, 0, 0, 0.5)'}/>
                        &nbsp;{partyInfo.partyCount}
                    </div>
                </div>
            </div>
            <div className='menu-icon' onClick={onClick}>
                <Menu width={23} height={23} color={'rgba(0, 0, 0, 0.5)'}/>
            </div>
        </div>
    )
}

export default MessageHeaderBox;