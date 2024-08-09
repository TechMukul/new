import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Index.module.scss";
import Navbar from "../../Components/Navbar";
import Dashboard from "../../Components/Dashboardleft";
import Link from "next/link";
// import { Link } from 'react-router-dom';

const Index = () => {
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/data/all-category"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div style={{ display: "flex" }} className={styles.container}>
        <div className={styles.cardContainer}>
          {categories.map((category: any) => (
            <Link
              href={`/Skintypes/${category.name}`}
              style={{ textDecoration: "none" }}
            >
              <div key={category._id} className={styles.card}>
                <img
                  src={category.photo}
                  alt={category.name}
                  className={styles.cardImage}
                />
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>{category.name}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
