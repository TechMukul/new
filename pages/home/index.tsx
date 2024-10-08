import React, { useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router
import Navbar from "../../Components/Navbar";
import Dashboardleft from "../../Components/Dashboardleft";
import Intro from "@/Components/Intro";
import Game from "@/Components/Games";
import About from "@/Components/About";
import Feature from "@/Components/Featured";
import style from "./index.module.scss";
import Image from "next/image";
import Review from "@/Components/Review";

const Index = () => {
  const router = useRouter(); // Initialize useRouter hook
  useEffect(()=>{
    const tokens=localStorage.getItem("accessToken");
    console.log(tokens)
  },[])
  return (
    <div className={style.container}>
      {/* <Navbar /> */}
      {/* <Dashboardleft /> */}
      <div>
        <Intro />
        <Game />
        <Feature/>
        <About/>
        <Review />
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Index;
