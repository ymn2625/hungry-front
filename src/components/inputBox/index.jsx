import {forwardRef, useState} from "react";
import './style.css';

const InputBox = forwardRef((props, ref) => {
    const {name, title, placeholder, type, value, message, onChange, onKeyDown} = props;

    const [isFocus, setIsFocus] = useState(false);

    const contentClass = !!message ? 'input-box-content-error' : (isFocus ? 'input-box-content-focus' : 'input-box-content');

    const onFocusHandler = () => {
        setIsFocus(true);
    }
    const onBlurHandler = () => {
        setIsFocus(false);
    }

    return (
        <div className='input-box'>
            <div className={contentClass}>
                <div className='input-box-title'>{title}</div>
                <input className='input-box-input' name={name} ref={ref} onFocus={onFocusHandler} onBlur={onBlurHandler} placeholder={placeholder} type={type} value={value} onChange={onChange} onKeyDown={onKeyDown}/>
            </div>
            {!!message && <div className='input-box-message-error'>{message}</div>}
        </div>
    )
});

export default InputBox;