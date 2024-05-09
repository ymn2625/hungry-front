import './style.css';

const TitleBox = (props) => {
    const {title, subTitle} = props;

    return (
        <div className='title-box'>
            <div className='title-box-title'>{title}</div>
            <div className='title-box-sub-title'>{subTitle}</div>
        </div>
    )
}

export default TitleBox;