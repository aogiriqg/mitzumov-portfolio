import React, { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader: React.FC<{ onFinish?: () => void }> = ({ onFinish }) => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);
      setTimeout(() => onFinish && onFinish(), 600);
    }, 1800);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`preloader-backdrop${hide ? ' preloader-hide' : ''}`}>
      <div className="preloader-content">
        <div className="preloader-logo">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="#232b4a" />
            <text x="13" y="48" fontFamily="Montserrat,Arial,sans-serif" fontWeight="bold" fontSize="38" fill="#7f8fff">M</text>
            <text x="17" y="48" fontFamily="Montserrat,Arial,sans-serif" fontWeight="bold" fontSize="38" fill="#bfcfff" opacity="0.92">Z</text>
          </svg>
        </div>
        <div className="preloader-title">MitzumovProject</div>
        <div className="preloader-welcome">Добро пожаловать!</div>
      </div>
    </div>
  );
};

export default Preloader; 