import React, { useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router
import Navbar from "../../Components/Navbar";
import Dashboardleft from "../../Components/Dashboardleft";

const Index = () => {
  const router = useRouter(); // Initialize useRouter hook
  return (
    <div>
      {/* <Navbar /> */}
      <Dashboardleft />
      <div>
        <div><h1>SPC Accounts</h1></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Index;
