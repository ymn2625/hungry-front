import './style.css';
import {useNavigate} from "react-router-dom";

const InfoBox = (props) => {
    // useNavigate
    const navigate= useNavigate();

    // value
    const {title, value, url, isLast} = props;
    const isLastClass = (isLast) ? 'user-info-box last' : 'user-info-box';
    const isOnClickClass = (url) ? 'click' : '';

    // onClick
    const onClickHandler = () => {
        if(url) {
            navigate(url);
        }
    }

    return (
        <div className={isOnClickClass}>
            <div className={isLastClass} onClick={onClickHandler}>
                <div className='info'>{title}</div>
                <div className='user-info'>
                    {value}
                    {(url) && <span>&nbsp;&nbsp;&gt;</span>}
                </div>
            </div>
        </div>
    )
}

export default InfoBox;