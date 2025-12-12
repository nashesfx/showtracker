import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ title, theme, toggleTheme }) => {
  return (
    <header>
        <button id="theme-switch" onClick={toggleTheme}>
            {theme === 'dark' ? (
                 <svg className="icon-sun" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-360q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM480-80q-83 0-141.5-58.5T280-280q0-83 58.5-141.5T480-480q83 0 141.5 58.5T680-280q0 83-58.5 141.5T480-80Zm0-80q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0-120q-17 0-28.5-11.5T440-480q0-17 11.5-28.5T480-520q17 0 28.5 11.5T520-480q0 17-11.5 28.5T480-440Zm-280-40q-17 0-28.5-11.5T160-520q0-17 11.5-28.5T200-560h80q17 0 28.5 11.5T320-520q0 17-11.5 28.5T280-480h-80Zm400 0q-17 0-28.5-11.5T560-520q0-17 11.5-28.5T600-560h80q17 0 28.5 11.5T800-520q0 17-11.5 28.5T760-480h-80ZM480-760q-17 0-28.5-11.5T440-800v-80q0-17 11.5-28.5T480-920q17 0 28.5 11.5T520-880v80q0 17-11.5 28.5T480-760ZM200-280q-17 0-28.5-11.5T160-320v-80q0-17 11.5-28.5T200-440q17 0 28.5 11.5T240-400v80q0 17-11.5 28.5T200-280Zm560 0q-17 0-28.5-11.5T720-320v-80q0-17 11.5-28.5T760-440q17 0 28.5 11.5T800-400v80q0 17-11.5 28.5T760-280Z"/></svg>
            ) : (
                <svg className="icon-moon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q50 0 96-24.5t76-66.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z"/></svg>
            )}
        </button>
        <div className="container">
            <h1 id="site-title">{title}</h1>
            <nav>
                <ul>
                    <li><Link to="/" className="active">Home</Link></li>
                    <li><Link to="/features">Features</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                </ul>
            </nav>
        </div>
    </header>
  );
}

export default Header;