import React from "react";
import style from "./index.module.scss";
import Image from "next/image";
const index = () => {
  return (
    <div className={`${style.bg} ${style.flex}`}>
      <div className={style.left}>
        <div className={style.logo}>
          <Image
            src={
              "https://logovectorseek.com/wp-content/uploads/2020/02/demos-logo-vector.png"
            }
            alt="pic"
            width={300}
            height={100}
          ></Image>
        </div>
      </div>
      <div className={style.right}>
        <p>
          SPC Accounts: The Ultimate Trading Hub for Gamers Welcome to SPC
          Accounts, where the virtual economy comes alive! Crafted by gamers for
          gamers, our platform is designed to be your premier destination for
          trading in-game assets. We recognize the true worth of your digital
          treasures, and we’re committed to offering a secure, seamless, and
          exhilarating space where you can buy, sell, and trade with confidence.
        </p>
        <h2>Why SPC Accounts?


</h2>
      </div>
    </div>
  );
};

export default index;
