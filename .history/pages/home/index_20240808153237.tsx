import React, { useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router
import Navbar from "../../Components/Navbar";
import Dashboardleft from "../../Components/Dashboardleft";
import Intro from "@/Components/Intro";
import Game from "@/Components/Games";
import Feature from "@/Components/Featured";
import style from "./index.module.scss";
import Image from "next/image";

const Index = () => {
  const router = useRouter(); // Initialize useRouter hook
  return (
    <div className={style.container}>
      {/* <Navbar /> */}
      {/* <Dashboardleft /> */}
      <div>
        <Intro />
        <Game />
        <Feature/>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Index;
