// Footer.js

import React from 'react';
import './style.css'; // 스타일 파일을 불러옵니다.

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-section">
                <div className="logo-box"></div>
                <div className="title">지도</div>
            </div>
            <div className="footer-section">
                <div className="logo-box"></div>
                <div className="title">배고팟</div>
            </div>
            <div className="footer-section">
                <div className="logo-box"></div>
                <div className="title">친구</div>
            </div>
            <div className="footer-section">
                <div className="logo-box"></div>
                <div className="title">마이페이지</div>
            </div>
        </footer>
    );
}

export default Footer;
