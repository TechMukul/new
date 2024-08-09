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
        <div className={`${style.bg} ${style.flex}`}>
          <h1>POPULAR GAMES</h1>
          <div className={style.cardContainer}>
            <div className={style.card}>
              <Image
                className={style.img}
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShrCQgfD9QCHTWN1ive5HhFoXB0qncPEJ26g&s"
                }
                width={250}
                height={280}
                // layout="fill" // Cover the container
                // objectFit="cover" // Ensure the image covers the container
                // priority
                alt="pic"
              ></Image>

              <h1>RISE OF CASTLES</h1>
            </div>
            <div className={style.card}>
              <Image
                className={style.img}
                src={
                  "data:image/jpeg;base64,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"
                }
                width={250}
                height={280}
                // layout="fill" // Cover the container
                // objectFit="cover" // Ensure the image covers the container
                // priority
                alt="pic"
              ></Image>

              <h1>RISE OF CASTLES</h1>
            </div>
            <div className={style.card}>
              <Image
                className={style.img}
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShrCQgfD9QCHTWN1ive5HhFoXB0qncPEJ26g&s"
                }
                width={250}
                height={280}
                // layout="fill" // Cover the container
                // objectFit="cover" // Ensure the image covers the container
                // priority
                alt="pic"
              ></Image>

              <h1>RISE OF CASTLES</h1>
            </div>
            <div className={style.card}>
              <Image
                className={style.img}
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShrCQgfD9QCHTWN1ive5HhFoXB0qncPEJ26g&s"
                }
                width={250}
                height={280}
                // layout="fill" // Cover the container
                // objectFit="cover" // Ensure the image covers the container
                // priority
                alt="pic"
              ></Image>

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
