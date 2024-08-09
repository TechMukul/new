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
           
            <Image
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShrCQgfD9QCHTWN1ive5HhFoXB0qncPEJ26g&s"
              }
              // width={200}
              // height={200}
              objectFit="cover"
              alt="pic"
              className={style.img}
            ></Image>
        
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
