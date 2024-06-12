import defaultProfileImg from "../../assets/images/default-profile-image.jpeg";
import crownImg from "../../assets/images/crown.png";
import './style.css'

const PartyMemberBox = ({partyMember}) => {
    return (
        <div className='party-member-list'>
            <div className='party-member-profile-img'
                 style={{backgroundImage: `url(${partyMember.userProfileImg ? partyMember.userProfileImg : defaultProfileImg})`}}>
            </div>
            <div className='party-member-name-status'>
                {partyMember.memberRole === 1 &&
                    (<div className='party-member-status' style={{backgroundImage:`url(${crownImg})`}}></div>)
                }
                <div className='party-member-name'>{partyMember.userNickname}</div>
            </div>
        </div>
    )
}

export default PartyMemberBox;