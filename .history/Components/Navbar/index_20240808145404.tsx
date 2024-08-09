import React, { useState } from 'react';
import style from './index.module.scss';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className={style.hamburger} onClick={toggleMenu}>
        ☰
      </div>
      <div className={style.image}>
      </div>
      <ul className={`${style.caintainer} ${isMenuOpen ? style.showMenu : ''}`}>
        <li className={style.items}>
          <div className={style.name}>
            <p>Home</p>
            {/* <hr className={style.line} /> */}
          </div>
        </li>
        <li className={style.items}>
          <div className={style.name}>
            <p>Cluster</p>
            <hr className={style.line} />
          </div>
        </li>
        <li className={style.items}>
          <div className={style.name}>
            <p>Skins</p>
            <hr className={style.line} />
          </div>
        </li>
        <li className={style.items}>
          <div className={style.name}>
            <p>Contact</p>
            <hr className={style.line} />
          </div>
        </li>
        <li className={style.items}>
          <div className={style.name}>
            <p>Login</p>
            <hr className={style.line} />
          </div>
        </li>
      </ul>
    </>
  );
};

export default Navbar;


