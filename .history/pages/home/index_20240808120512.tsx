import React, { useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router
import Navbar from "../../Components/Navbar";
import Dashboardleft from "../../Components/Dashboardleft";
import style from "./index.module.scss";

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
            <br />with
            Confidence
          </p>
        </div>
        <div className={style.bg}></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Index;
