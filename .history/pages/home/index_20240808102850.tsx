import React, { useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import Navbar from '../../Components/Navbar';
import Dashboardleft from '../../Components/Dashboardleft';

const Index = () => {
  const router = useRouter(); // Initialize useRouter hook

// useEffect depends on router

  return (
    <div>
      <Navbar />
      <Dashboardleft />
    </div>
  );
};

export default Index;
