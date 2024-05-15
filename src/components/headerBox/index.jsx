import './style.css';

const HeaderBox = (props) => {
    const { onClick, title } = props;
    const sideClass = (!onClick) ? 'header-side' : 'header-side back-arrow';


    return (
        <div className='header-container'>
            <div className={sideClass} onClick={onClick}></div>
            <div className='header-title'>{title}</div>
            <div className='header-side'></div>
        </div>
    )
}

export default HeaderBox;