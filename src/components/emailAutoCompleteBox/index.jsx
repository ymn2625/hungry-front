import './style.css';

const EmailAutoCompleteBox = ((props) => {
        const {emailList, showEmailList, onEmailListClickHandler} = props;

        return (
            <>
                {(emailList.length !== 0 && showEmailList) &&
                    <div className='email-list-box'>
                        {emailList
                            .map((email, index) =>
                                <div className='email-list' key={index} onClick={() => onEmailListClickHandler(email)}>{email}</div>
                            )
                        }
                    </div>
                }
            </>
        )
})

export default EmailAutoCompleteBox;