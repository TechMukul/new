import React, { useState } from 'react';
import style from './index.module.scss';
import Link from 'next/link';

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
          <p><Link href={"/"} style={{textDecoration:"none",color:"white"}}>Home </Link></p>
            <hr className={style.line} />
          </div>
        </li>
        <li className={style.items}>
          <div className={style.name}>
          <p><Link href={"/Tree"} style={{textDecoration:"none",color:"white"}}>All Users </Link></p>
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
            <p><Link href={"/contact"} style={{textDecoration:"none",color:"white"}}>Contact </Link></p>
            <hr className={style.line} />
          </div>
        </li>
        <li className={style.items}>
          <div className={style.name}>
          <p><Link href={"/Login"} style={{textDecoration:"none",color:"white"}}>Login </Link></p>
            <hr className={style.line} />
          </div>
        </li>
      </ul>
    </>
  );
};

export default Navbar;


