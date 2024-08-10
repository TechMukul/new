import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./index.module.scss";
import Link from "next/link";
import Image from "next/image";

const Index = () => {
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.referback.trollsufficient.com/data/all-category"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.cardContainer}>
      {categories.map((category: any) => (
        <Link
          key={category._id} // Ensure to add key here for React list rendering
          href={`/Skintypes/${category.name}`}
          style={{ textDecoration: "none" }}
        >
          <div className={styles.card}>
            <Image
              src={category.photo}
              alt={category.name || "Category Image"} // Provide a meaningful alt text
              className={styles.cardImage}
              width={500} // Adjust width as needed
              height={300} // Adjust height as needed
            />
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{category.name}</h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Index;
