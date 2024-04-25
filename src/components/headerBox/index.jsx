import './style.css';

const HeaderBox = (props) => {
    const { onClick, title } = props;

    return (
        <div className='header-container'>
            <div className='header-side back-arrow' onClick={onClick}></div>
            <div className='header-title'>{title}</div>
            <div className='header-side'></div>
        </div>
    )
}

export default HeaderBox;