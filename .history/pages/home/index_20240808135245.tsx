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
                  "https://i.pinimg.com/736x/e8/7f/d6/e87fd686a3e9053b4d4bc5b0277dcf72.jpg"
                }
                width={250}
                height={280}
                // layout="fill" // Cover the container
                // objectFit="cover" // Ensure the image covers the container
                // priority
                alt="pic"
              ></Image>

              <h1>CLASH OF CLANS</h1>
            </div>
            <div className={style.card}>
              <Image
                className={style.img}
                src={
                  "https://assets-prd.ignimgs.com/2022/05/27/clashroyale-1653673820137.jpg"
                }
                width={250}
                height={280}
                // layout="fill" // Cover the container
                // objectFit="cover" // Ensure the image covers the container
                // priority
                alt="pic"
              ></Image>

              <h1>CLASH OF ROYALE</h1>
            </div>
            <div className={style.card}>
              <Image
                className={style.img}
                src={
                  "https://cdn.mos.cms.futurecdn.net/fhMAcwcNZavsrQ7nPHZvXh.jpg"
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
