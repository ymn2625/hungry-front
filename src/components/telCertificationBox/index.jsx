import TitleBox from "../titleBox";
import InputBox from "../inputBox";
import "./style.css";

export const TelBox = (props) => {

    return (
        <div className='tel-certification-container'>
            <div className='tel-certification-content'>
                <TitleBox title='휴대폰 인증' subTitle='휴대폰 인증이 필요합니다'></TitleBox>
                <div className='tel-certification-content-input-box'>
                    <InputBox ref={props.nameRef} title='이름' placeholder='이름 입력' type='text' value={props.userName}
                              onChange={props.onNameChangeHandler} message={props.nameError} isReadOnly={props.isReadOnly}/>
                    <InputBox ref={props.telRef} title='휴대폰 번호' placeholder='01012341234' type='text'
                              value={props.userTel}
                              onChange={props.onTelChangeHandler} message={props.telError}/>
                </div>
            </div>
            <div className={props.nameTelButtonClass} onClick={props.onNameTelButtonClickHandler}>다음</div>
        </div>
    )
}

export const CertificationBox = (props) => {
    return (
        <div className='tel-certification-container'>
            <div className='tel-certification-content'>
                <TitleBox title='인증번호' subTitle='문자로 받은 인증번호를 입력하세요'></TitleBox>
                <div className='tel-certification-content-input-box'>
                    <InputBox ref={props.certificationNumberRef} title='인증번호' placeholder='인증번호 6자리 입력'
                              type='text' value={props.certificationNumber}
                              onChange={props.onCertificationChangeHandler} message={props.certificationNumberError}/>
                </div>
            </div>
            <div className={props.certificationButtonClass} onClick={props.onCertificationButtonClickHandler}>다음</div>
        </div>
    )
}