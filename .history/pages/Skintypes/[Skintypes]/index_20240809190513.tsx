import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import Modal from "../../../Components/Modal";
import Sell from "../../../Components/Sell";

const Index = () => {
  const [castlesData, setCastlesData] = useState<any>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSell, setShowSell] = useState<boolean>(false);
  const [currentCastle, setCurrentCastle] = useState<any>(null);
  const router = useRouter();
  const { Skintypes } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.referback.trollsufficient.com/data/permalink/${Skintypes}`
        );
        setCastlesData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (Skintypes) {
      fetchData();
    }
  }, [Skintypes]);

  const handleEdit = (castle: any) => {
    setCurrentCastle(castle); 
    setShowModal(true);
  };

  const handleSell = (castle: any) => {
    setCurrentCastle(castle);
    setShowSell(true);
  };

  const handleInputChange = (field: any, value: any) => {
    setCurrentCastle((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        `https://www.referback.trollsufficient.com/data/castles/${currentCastle._id}`,
        {
          ...currentCastle,
          quantity: Number(currentCastle.quantity), // Ensure quantity is a number
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCastlesData((prev: any) =>
        prev.map((castle: any) =>
          castle._id === currentCastle._id ? currentCastle : castle
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleSellSave = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      
      await axios.post(
        "https://www.referback.trollsufficient.com/customer/details",
        {
          name: currentCastle.customerName,
          skintype: currentCastle.skintype,
          quantity: Number(currentCastle.quantitySold), // Ensure quantitySold is a number
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      const updatedCastle = {
        ...currentCastle,
        quantity: Number(currentCastle.quantity) - Number(currentCastle.quantitySold), // Ensure both quantities are numbers
      };

      await axios.put(
        `https://www.referback.trollsufficient.com/data/castles/${currentCastle._id}`,
        updatedCastle,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCastlesData((prev: any) =>
        prev.map((castle: any) =>
          castle._id === currentCastle._id ? updatedCastle : castle
        )
      );
      setShowSell(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div className={styles.cardContainer}>
          {castlesData.map((castle: any) => (
            <div key={castle._id} className={styles.card}>
              <Image
                src={castle.photo[0]}
                alt={castle.skintype || "Castle Image"} // Provide a meaningful alt text
                className={styles.cardImage}
                width={500} // Adjust width as needed
                height={300} // Adjust height as needed
              />
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{castle.skintype}</h2>
                <p className={styles.cardText}>
                  <strong>Quantity:</strong> {castle.quantity}
                </p>
                <p className={styles.cardText}>
                  <strong>Castles:</strong> {castle.castles.join(", ")}
                </p>
                <p className={styles.cardText}>
                  <strong>Buff:</strong> {castle.buff.join(", ")}
                </p>
                <button onClick={() => handleEdit(castle)}>Edit</button>
                <button onClick={() => handleSell(castle)}>Sell</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        castle={currentCastle}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
      />
      <Sell
        show={showSell}
        onClose={() => setShowSell(false)}
        castle={currentCastle}
        handleInputChange={handleInputChange}
        handleSave={handleSellSave}
      />
    </>
  );
};

export default Index;
