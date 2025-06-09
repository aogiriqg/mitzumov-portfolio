import React from 'react';
import { FaHome, FaRegCircle, FaRegSquare } from 'react-icons/fa';
import './HeaderBar.css';

const navItems = [
  { icon: <FaHome />, label: 'Home', id: 'home', href: '#home' },
  { icon: <FaRegCircle />, label: 'Обо мне', id: 'about', href: '#about' },
  { icon: <FaRegSquare />, label: 'Проекты', id: 'projects', href: '#projects' },
];

const HeaderBar: React.FC = () => {
  const [active, setActive] = React.useState('home');

  const handleNavClick = (id: string, href: string) => {
    setActive(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.querySelector(href);
      if (el) (el as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="header-bar">
      <div className="header-nav">
        {navItems.map(item => (
          <a
            key={item.id}
            href={item.href}
            className={`header-btn${active === item.id ? ' active' : ''}`}
            onClick={e => {
              e.preventDefault();
              handleNavClick(item.id, item.href);
            }}
          >
            {item.icon}
            <span className="header-label">{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default HeaderBar; 