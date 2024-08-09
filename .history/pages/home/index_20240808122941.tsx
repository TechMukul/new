import React, { useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router
import Navbar from "../../Components/Navbar";
import Dashboardleft from "../../Components/Dashboardleft";
import style from "./index.module.scss";
import Image from "next/image";

const Index = () => {
  const router = useRouter(); // Initialize useRouter hook
  return (
    <div className={style.container}>
      {/* <Navbar /> */}
      {/* <Dashboardleft /> */}
      <div>
        <div className={style.bg}>
          <h1>SPC X ACCOUNTS</h1>
          <p>
            Your Virtual Marketplace for In-Game Assets: Buy, Sell, Trade
            <br />
            with Confidence
          </p>
        </div>
        <div className={style.bg}>
          <h1>POPULAR GAMES</h1>
          <div className={style.card}>
            <div className={style.img}>
            <Image
              src={
                "https://static.wixstatic.com/media/43ee96_7009153cd2284935b34e4bbb6590fdfa~mv2.png/v1/crop/x_0,y_304,w_2512,h_1518/fill/w_560,h_338,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ROCs_logo.png"
              }
              width={170}
              height={100}
              alt="pic"
              className={style.img}
            ></Image>
            </div>
            <div>
            <h1>RISE OF CASTLES</h1>
            </div>
          </div>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Index;
