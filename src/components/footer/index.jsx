// Footer.js

import React from 'react';
import './style.css';
import Map from "../bootstrapIcon/Map";
import BpLogo from "../bootstrapIcon/BpLogo";
import People from "../bootstrapIcon/People";
import My from "../bootstrapIcon/My";
import {useNavigate} from "react-router-dom";
import store_store from "../../stores/store_store";


const Footer = () => {
    const navigate = useNavigate(); // useNavigate로 변경

    const {setStoreResultRemove} = store_store();
    const {setStoreId} = store_store();


    const moveToMap = () => {
        //setStoreResultRemove('');
        //setStoreId(null);
        navigate('/');
    }

    return (
        <footer className="footer">
            <div className="footer-section">
                <div className="logo-box" onClick={moveToMap}><Map w={'32px'} h={'32px'}/></div>
                <div className="title">지도</div>
            </div>
            <div className="footer-section">
                <div className="logo-box"><BpLogo w={'44px'} h={'32px'}/></div>
                <div className="title">배고팟</div>
            </div>
            <div className="footer-section">
                <div className="logo-box"><People w={'32px'} h={'32px'}/></div>
                <div className="title">친구</div>
            </div>
            <div className="footer-section">
                <div className="logo-box"><My w={'32px'} h={'32px'}/></div>
                <div className="title">마이페이지</div>
            </div>
        </footer>
    );
}

export default Footer;
