import React from "react";
import style from "./index.module.scss";
import Image from "next/image";
const index = () => {
  return (
    <div className={`${style.bg} ${style.flex}`}>
      <div className={style.left}>
        <div className={style.l}>
          <Image
            src={
              "https://logovectorseek.com/wp-content/uploads/2020/02/demos-logo-vector.png"
            }
            alt="pic"
            width={300}
            height={100}
            className={style.logo}
          ></Image>
        </div>
      </div>
      <div className={style.right}>
        <p>
          <b>SPC Accounts : </b>The Ultimate Trading Hub for Gamers Welcome to
          SPC Accounts, where the virtual economy comes alive! Crafted by gamers
          for gamers, our platform is designed to be your premier destination
          for trading in-game assets. We recognize the true worth of your
          digital treasures, and we’re committed to offering a secure, seamless,
          and exhilarating space where you can buy, sell, and trade with
          confidence.
        </p>
        <h1>Why SPC Accounts?</h1>
        <ul className={style.ul}>
          <li>
            {" "}
            <b>1.Secure Transactions:</b> Trust in a robust system built to
            safeguard your assets and transactions.
          </li>
          <li>
            {" "}
            <b>2.Gamer-Centric Design:</b> Experience a platform tailored to the
            needs and passions of gamers like you.
          </li>
          <li>
            {" "}
            <b>3.Seamless Experience:</b> Enjoy an intuitive interface that
            makes trading your virtual valuables effortless and enjoyable.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default index;
