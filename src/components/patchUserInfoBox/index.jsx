import HeaderBox from "../headerBox";
import InputBox from "../inputBox";
import "./style.css";

const PatchUserInfoBox = (props) => {
    return (
        <div className='info-wrapper'>
            <HeaderBox onClick={props.onPrevClickHandler} title={`${props.title} 변경`}/>
            <div className='content-box'>
                <div className='main-box'>
                    <div className='title-div'>{props.mention}</div>
                    <InputBox ref={props.inputRef} title={props.title} placeholder={props.placeholder} type={props.type ? props.type : 'text'}
                              value={props.value} onChange={props.onChangeHandler} message={props.message}/>
                    {props.children && props.children}
                </div>
                <div className={props.buttonClass} onClick={props.onButtonClickHandler}>
                    다음
                </div>
            </div>
        </div>
    )
}

export default PatchUserInfoBox;