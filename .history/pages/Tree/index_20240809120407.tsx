import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import axios from "axios";
// import moduleName from '@/Components/'
import { useRouter } from "next/router";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  leftChild?: string;
  rightChild?: string;
  coins?: number | any;
  role: any;
  referralCode?: string;
}

interface TreeNodeProps {
  node: User;
  left: TreeNodeProps | null;
  right: TreeNodeProps | null;
  onClick: (node: User) => void;
  onAddChild: (parentId: string, selectedOption: "left" | "right") => void;
  refreshKey: number; // Pass refreshKey as prop
  userRole: string | null; // Pass userRole as prop
}

const createBinaryTree = (users: any): Map<string, TreeNodeProps> => {
  const userMap = new Map<string, any>();

  users.forEach((user: any) => {
    userMap.set(user._id, { node: user, left: null, right: null });
  });

  users.forEach((user: any) => {
    const node = userMap.get(user._id);
    if (user.leftChild && userMap.has(user.leftChild)) {
      node!.left = userMap.get(user.leftChild)!;
    }
    if (user.rightChild && userMap.has(user.rightChild)) {
      node!.right = userMap.get(user.rightChild)!;
    }
  });

  return userMap;
};

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  left,
  right,
  onClick,
  onAddChild,
  refreshKey,
  userRole,
}) => {
  const [loading, setloading] = useState(false);
  const [showCoinsPopup, setShowCoinsPopup] = useState(false);
  const [newCoins, setNewCoins] = useState("");
  const [updatingCoins, setUpdatingCoins] = useState(false);

  const handleCoinsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCoins(e.target.value);
  };

  const handleUpdateCoins = async () => {
    try {
      setloading(true);
      setUpdatingCoins(true);
      const token = localStorage.getItem("accessToken");
      const apiEndpoint = `https://www.referback.trollsufficient.com/admin/distribute-coins/${node.referralCode}`;

      const response = await axios.post(
        apiEndpoint,
        { coins: newCoins },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Coins updated successfully:", response.data);
      setNewCoins("");
      setShowCoinsPopup(false);
      setUpdatingCoins(false);

      // Reload the page to reflect updated coins
      window.location.reload();
    } catch (error) {
      console.error("Error updating coins:", error);
      setUpdatingCoins(false);
    }
  };

  const handleAddChild = (selectedOption: "left" | "right") => {
    onAddChild(node._id, selectedOption);
  };

  return (
    <>
      <div className={styles.node} onClick={() => onClick(node)}>
        <div className={styles.icon}>
          <i className="fas fa-user"></i>
        </div>
        <div className={styles.name}>{node.name}</div>
        {userRole === "admin" && (
          <div className={styles.email}>{node.email}</div>
        )}
        <div className={styles.id}>Coins: {node.coins}</div>
        {userRole === "admin" && (
          <div className={styles.id}>Referral Code: {node.referralCode}</div>
        )}

        {/* Conditionally render Add Child buttons based on role */}
        {userRole === "admin" && !left && (
          <div className={styles.addChild}>
            <button
              className={styles.addChildButton}
              onClick={() => handleAddChild("left")}
            >
              <i className="fas fa-plus"></i> Add Left Child
            </button>
          </div>
        )}

        {userRole === "admin" && !right && (
          <div className={styles.addChild}>
            <button
              className={styles.addChildButton}
              onClick={() => handleAddChild("right")}
            >
              <i className="fas fa-plus"></i> Add Right Child
            </button>
          </div>
        )}

        {left && (
          <div className={styles.lineWrapper}>
            <div className={`${styles.line} ${styles.lineLeft}`}></div>
          </div>
        )}

        {right && (
          <div className={styles.lineWrapper}>
            <div className={`${styles.line} ${styles.lineRight}`}></div>
          </div>
        )}
      </div>

      {/* Conditionally render Send Coins button based on role */}
      {userRole === "admin" && !showCoinsPopup && (
        <div className={styles.sendCoinnew}>
          <button
            className={`${styles.sendCoinsButton} ${
              updatingCoins ? styles.updating : ""
            }`}
            onClick={() => setShowCoinsPopup(true)}
          >
            Send Coins
          </button>
        </div>
      )}

      <div className={styles.sendCoins}>
        {showCoinsPopup && (
          <div className={styles.form}>
            <input
              type="number"
              placeholder="Enter Coins"
              value={newCoins}
              onChange={handleCoinsChange}
            />
            <button
              className={styles.updateCoinsButton}
              onClick={handleUpdateCoins}
            >
              Update Coins
            </button>
            {loading && (
              <h1 className={styles.loadingOverlay} style={{ color: "white" }}>
                Loading
              </h1>
            )}
          </div>
        )}
      </div>
    </>
  );
};
import { useRef } from "react";
// import React, {useRef } from 'react';

// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import styles from './Index.module.css'; // Update with your actual path
// import Navbar from './Navbar'; // Update with your actual path
// import TreeNode from './TreeNode'; // Update with your actual path

// interface User {
//   _id: string;
//   name: string;
//   password: string;
//   referralCode: string;
//   coins: string;
//   parentId: string | null;
//   leftChild: string | null;
//   rightChild: string | null;
//   role: string;
//   __v: number;
//   lastActiveAt: string;
//   email: string;
// }

// interface TreeNodeProps {
//   node: User;
//   left: TreeNodeProps | null;
//   right: TreeNodeProps | null;
// }

const Index: React.FC = () => {
  const [users, setUsers] = useState<any>([]);
  const [userMap, setUserMap] = useState<Map<string, TreeNodeProps> | null>(
    null
  );
  const [currentNode, setCurrentNode] = useState<any | null>(null);
  const [viewAll, setViewAll] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [parentId, setParentId] = useState("");
  const [selectedOption, setSelectedOption] = useState<"left" | "right">(
    "left"
  );
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [previousTree, setPreviousTree] = useState<User[] | null>(null); // State to store previous tree nodes
  const [allcoins, setCoins] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const youNodeRef = useRef<HTMLDivElement | null>(null); // Ref for the "You" card
  const treeContainerRef = useRef<HTMLDivElement | null>(null); // Ref for the tree container

  useEffect(() => {
    const coins = localStorage.getItem("userCoins");
    setCoins(coins);
  }, [router]);

  const nonAdminUsers = [
    {
      _id: "root",
      name: "Admin",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: null,
      leftChild: "1",
      rightChild: "2",
      role: "admin",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "a@gmail.com",
    },
    {
      _id: "1",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "root",
      leftChild: "3",
      rightChild: "4",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user1@example.com",
    },
    {
      _id: "2",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "root",
      leftChild: "5",
      rightChild: "6",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user2@example.com",
    },
    {
      _id: "3",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "1",
      leftChild: "7",
      rightChild: "8",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user3@example.com",
    },
    {
      _id: "4",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "1",
      leftChild: "9",
      rightChild: "10",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user4@example.com",
    },
    {
      _id: "5",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "2",
      leftChild: "11",
      rightChild: "12",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user5@example.com",
    },
    {
      _id: "6",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "2",
      leftChild: "13",
      rightChild: "14",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user6@example.com",
    },
    {
      _id: "7",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "3",
      leftChild: "15",
      rightChild: "16",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user7@example.com",
    },
    {
      _id: "8",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "3",
      leftChild: "17",
      rightChild: "18",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user8@example.com",
    },
    {
      _id: "9",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "4",
      leftChild: "19",
      rightChild: "20",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user9@example.com",
    },
    {
      _id: "10",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "4",
      leftChild: "21",
      rightChild: "22",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user10@example.com",
    },
    {
      _id: "11",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "5",
      leftChild: "23",
      rightChild: "24",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user11@example.com",
    },
    {
      _id: "12",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "5",
      leftChild: "25",
      rightChild: "26",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user12@example.com",
    },
    {
      _id: "13",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "6",
      leftChild: "27",
      rightChild: "28",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user13@example.com",
    },
    {
      _id: "14",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "6",
      leftChild: "29",
      rightChild: "30",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user14@example.com",
    },
    {
      _id: "15",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "7",
      leftChild: "31",
      rightChild: "32",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user15@example.com",
    },
    {
      _id: "16",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "7",
      leftChild: "33",
      rightChild: "34",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user16@example.com",
    },
    {
      _id: "17",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "8",
      leftChild: "35",
      rightChild: "36",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user17@example.com",
    },
    {
      _id: "18",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "8",
      leftChild: "37",
      rightChild: "38",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user18@example.com",
    },
    {
      _id: "19",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "9",
      leftChild: "39",
      rightChild: "40",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user19@example.com",
    },
    {
      _id: "20",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "9",
      leftChild: "41",
      rightChild: "42",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user20@example.com",
    },
    {
      _id: "21",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "10",
      leftChild: "43",
      rightChild: "44",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user21@example.com",
    },
    {
      _id: "22",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "10",
      leftChild: "45",
      rightChild: "46",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user22@example.com",
    },
    {
      _id: "23",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "11",
      leftChild: "47",
      rightChild: "48",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user23@example.com",
    },
    {
      _id: "24",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "11",
      leftChild: "49",
      rightChild: "50",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user24@example.com",
    },
    {
      _id: "25",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "12",
      leftChild: "51",
      rightChild: "52",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user25@example.com",
    },
    {
      _id: "26",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "12",
      leftChild: "53",
      rightChild: "54",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user26@example.com",
    },
    {
      _id: "27",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "13",
      leftChild: "55",
      rightChild: "56",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user27@example.com",
    },
    {
      _id: "28",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "13",
      leftChild: "57",
      rightChild: "58",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user28@example.com",
    },
    {
      _id: "29",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "14",
      leftChild: "59",
      rightChild: "60",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user29@example.com",
    },
    {
      _id: "30",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "14",
      leftChild: "61",
      rightChild: "62",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user30@example.com",
    },
    {
      _id: "31",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "15",
      leftChild: "63",
      rightChild: "64",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user31@example.com",
    },
    {
      _id: "32",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "15",
      leftChild: "65",
      rightChild: "66",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user32@example.com",
    },
    {
      _id: "33",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "16",
      leftChild: "67",
      rightChild: "68",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user33@example.com",
    },
    {
      _id: "34",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "16",
      leftChild: "69",
      rightChild: "70",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user34@example.com",
    },
    {
      _id: "35",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "17",
      leftChild: "71",
      rightChild: "72",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user35@example.com",
    },
    {
      _id: "36",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "17",
      leftChild: "73",
      rightChild: "74",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user36@example.com",
    },
    {
      _id: "37",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "18",
      leftChild: "75",
      rightChild: "76",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user37@example.com",
    },
    {
      _id: "38",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "18",
      leftChild: "77",
      rightChild: "78",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user38@example.com",
    },
    {
      _id: "39",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "19",
      leftChild: "79",
      rightChild: "80",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user39@example.com",
    },
    {
      _id: "40",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "19",
      leftChild: "81",
      rightChild: "82",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user40@example.com",
    },
    {
      _id: "41",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "20",
      leftChild: "83",
      rightChild: "84",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user41@example.com",
    },
    {
      _id: "42",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "20",
      leftChild: "85",
      rightChild: "86",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user42@example.com",
    },
    {
      _id: "43",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "21",
      leftChild: "87",
      rightChild: "88",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user43@example.com",
    },
    {
      _id: "44",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "21",
      leftChild: "89",
      rightChild: "90",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user44@example.com",
    },
    {
      _id: "45",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "22",
      leftChild: "91",
      rightChild: "92",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user45@example.com",
    },
    {
      _id: "46",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "22",
      leftChild: "93",
      rightChild: "94",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user46@example.com",
    },
    {
      _id: "47",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "23",
      leftChild: "95",
      rightChild: "96",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user47@example.com",
    },
    {
      _id: "48",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "23",
      leftChild: "97",
      rightChild: "98",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user48@example.com",
    },
    {
      _id: "49",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "24",
      leftChild: "99",
      rightChild: "100",
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user49@example.com",
    },
    {
      _id: "50",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "24",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user50@example.com",
    },
    {
      _id: "51",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "25",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user51@example.com",
    },
    {
      _id: "52",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "25",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user52@example.com",
    },
    {
      _id: "53",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "26",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user53@example.com",
    },
    {
      _id: "54",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "26",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user54@example.com",
    },
    {
      _id: "55",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "27",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user55@example.com",
    },
    {
      _id: "56",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "27",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user56@example.com",
    },
    {
      _id: "57",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "28",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user57@example.com",
    },
    {
      _id: "58",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "28",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user58@example.com",
    },
    {
      _id: "59",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "29",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user59@example.com",
    },
    {
      _id: "60",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "29",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user60@example.com",
    },
    {
      _id: "61",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "30",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user61@example.com",
    },
    {
      _id: "62",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "30",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user62@example.com",
    },
    {
      _id: "63",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "31",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user63@example.com",
    },
    {
      _id: "64",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "31",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user64@example.com",
    },
    {
      _id: "65",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "32",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user65@example.com",
    },
    {
      _id: "66",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "32",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user66@example.com",
    },
    {
      _id: "67",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "33",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user67@example.com",
    },
    {
      _id: "68",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "33",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user68@example.com",
    },
    {
      _id: "69",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "34",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user69@example.com",
    },
    {
      _id: "70",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "34",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user70@example.com",
    },
    {
      _id: "71",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "35",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user71@example.com",
    },
    {
      _id: "72",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "35",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user72@example.com",
    },
    {
      _id: "73",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "36",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user73@example.com",
    },
    {
      _id: "74",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "36",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user74@example.com",
    },
    {
      _id: "75",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "37",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user75@example.com",
    },
    {
      _id: "76",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "37",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user76@example.com",
    },
    {
      _id: "77",
      name: "****",
      password: `******`,
      referralCode: "*****",
      coins: `${allcoins}`,
      parentId: "38",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user77@example.com",
    },
    {
      _id: "78",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "38",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user78@example.com",
    },
    {
      _id: "79",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "39",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user79@example.com",
    },
    {
      _id: "80",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "39",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user80@example.com",
    },
    {
      _id: "81",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "40",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user81@example.com",
    },
    {
      _id: "82",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "40",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user82@example.com",
    },
    {
      _id: "83",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "41",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user83@example.com",
    },
    {
      _id: "84",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "41",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user84@example.com",
    },
    {
      _id: "85",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "42",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user85@example.com",
    },
    {
      _id: "86",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "42",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user86@example.com",
    },
    {
      _id: "87",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "43",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user87@example.com",
    },
    {
      _id: "88",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "43",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user88@example.com",
    },
    {
      _id: "89",
      name: "YOu are here",
      password: "*****",
      referralCode: "*****",
      coins: `${allcoins}`,
      parentId: "44",
      leftChild: null,
      rightChild: null,
      role: "clients",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user89@example.com",
    },
    {
      _id: "90",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "44",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user90@example.com",
    },
    {
      _id: "91",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "45",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user91@example.com",
    },
    {
      _id: "92",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "45",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user92@example.com",
    },
    {
      _id: "93",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "46",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user93@example.com",
    },
    {
      _id: "94",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "46",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user94@example.com",
    },
    {
      _id: "95",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "47",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user95@example.com",
    },
    {
      _id: "96",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "47",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user96@example.com",
    },
    {
      _id: "97",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "48",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user97@example.com",
    },
    {
      _id: "98",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "48",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user98@example.com",
    },
    {
      _id: "99",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "49",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user99@example.com",
    },
    {
      _id: "100",
      name: "*****",
      password: "*****",
      referralCode: "*****",
      coins: "*****",
      parentId: "49",
      leftChild: null,
      rightChild: null,
      role: "client",
      __v: 0,
      lastActiveAt: "2024-08-02T08:42:57.466Z",
      email: "user100@example.com",
    },
  ];

  useEffect(() => {}, [router]);

  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   if (!token) {
  //     router.push("/Login");
  //     return;
  //   }
  // }, [router]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    // if (!token) {
    //   router.push("/Login");
    //   return;
    // }

    const fetchUserRole = () => {
      const role = localStorage.getItem("role");
      setUserRole(role);
    };

    fetchUserRole();

    if (userRole === "admin") {
      const fetchUsers = async () => {
        try {
          const response = await axios.get(
            "https://www.referback.trollsufficient.com/admin/all",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          setUsers(response.data);
          const map = createBinaryTree(response.data);
          setUserMap(map);

          if (response.data.length > 0) {
            setCurrentNode(response.data[0]);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

      fetchUsers();
    } else {
      setUsers(nonAdminUsers);
      setViewAll(true);
      const map = createBinaryTree(nonAdminUsers);
      setUserMap(map);

      if (nonAdminUsers.length > 0) {
        setCurrentNode(nonAdminUsers[0]);
      }
    }
  }, [refreshKey, router, userRole]); // Only run when userRole or refreshKey changes

  useEffect(() => {
    if (youNodeRef.current && treeContainerRef.current) {
      const container = treeContainerRef.current;
      const node = youNodeRef.current;
      node.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentNode]);

  // if (loading) {
  //   return (
  //     <div className={styles.loadingOverlay}>
  //       <div className={styles.spinner}></div>
  //     </div>
  //   ); // Show loading indicator
  // }
  const handleNodeClick = (node: User) => {
    setPreviousTree([...users]); // Store the previous tree nodes
    setCurrentNode(node);
  };

  const handleBackButtonClick = () => {
    if (previousTree && previousTree.length > 0) {
      setUsers(previousTree); // Restore previous tree nodes
      setUserMap(createBinaryTree(previousTree));
      setCurrentNode(previousTree[0]); // Set current node to the first node of the previous tree
      setPreviousTree(null); // Clear previous tree nodes
    }
  };

  const handleAddChild = async (
    parentId: string,
    selectedOption: "left" | "right"
  ) => {
    try {
      setParentId(parentId);
      setSelectedOption(selectedOption);
      setShowForm(true);
    } catch (error) {
      console.error("Error handling add child:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const apiEndpoint =
        selectedOption === "left"
          ? `https://www.referback.trollsufficient.com/admin/add-left-child/${parentId}`
          : `https://www.referback.trollsufficient.com/admin/add-right-child/${parentId}`;

      const token = localStorage.getItem("accessToken");

      const response = await axios.put(apiEndpoint, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to add child");
      }

      console.log("Child added successfully:", response.data);
      setSuccess(true);
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error: any) {
      console.error("Error adding child:", error);
      setError(error);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    setError(null);
    setSuccess(false);
  };

  const renderInitialNodes = (node: User | null) => {
    if (!node) return null;

    return (
      <div className={styles.children}>
        {userMap && userMap.has(node._id) && (
          <>
            {userMap.get(node._id)!.left && (
              <div className={styles.child} style={{ borderColor: "red" }}>
                <TreeNode
                  node={userMap.get(node._id)!.left!.node}
                  left={userMap.get(node._id)!.left!.left}
                  right={userMap.get(node._id)!.left!.right}
                  onClick={handleNodeClick}
                  onAddChild={handleAddChild}
                  refreshKey={refreshKey}
                  userRole={userRole}
                />
              </div>
            )}
            {userMap.get(node._id)!.right && (
              <div className={styles.child}>
                <TreeNode
                  node={userMap.get(node._id)!.right!.node}
                  left={userMap.get(node._id)!.right!.left}
                  right={userMap.get(node._id)!.right!.right}
                  onClick={handleNodeClick}
                  onAddChild={handleAddChild}
                  refreshKey={refreshKey}
                  userRole={userRole}
                />
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const renderCompleteTree = (node: User | null): JSX.Element | null => {
    if (!node) return null;

    const leftNode = userMap?.get(node._id)?.left?.node || null;
    const rightNode = userMap?.get(node._id)?.right?.node || null;
    const isClient = node.role === "clients";
    return (
      <div
        className={isClient ? `${styles.youCard}` : ""}
        ref={isClient ? youNodeRef : null}
        style={isClient ? { borderColor: "red" } : {}}
      >
        <TreeNode
          node={node}
          left={userMap?.get(node._id)?.left || null}
          right={userMap?.get(node._id)?.right || null}
          onClick={handleNodeClick}
          onAddChild={handleAddChild}
          refreshKey={refreshKey}
          userRole={userRole}
        />
        <div className={styles.children}>
          {leftNode && renderCompleteTree(leftNode)}
          {rightNode && renderCompleteTree(rightNode)}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {/* <Navbar /> */}
      {previousTree && (
        <button className={styles.backButton} onClick={handleBackButtonClick}>
          Back
        </button>
      )}
      <div className={styles.buttonWrapper}>
        <button
          className={styles.toggleButton}
          onClick={() => setViewAll(!viewAll)}
        >
          {viewAll ? "View Initial Nodes" : "View All Nodes"}
        </button>
      </div>
      <div className={styles.treeContainer} ref={treeContainerRef}>
        {viewAll
          ? renderCompleteTree(currentNode)
          : currentNode && (
              <div>
                <div
                  className={
                    currentNode.role === "clients" ? styles.youCard : ""
                  }
                  ref={currentNode.role === "clients" ? youNodeRef : null}
                  style={{ borderColor: "red" }}
                >
                  <TreeNode
                    node={currentNode}
                    left={userMap?.get(currentNode._id)?.left || null}
                    right={userMap?.get(currentNode._id)?.right || null}
                    onClick={handleNodeClick}
                    onAddChild={handleAddChild}
                    refreshKey={refreshKey}
                    userRole={userRole}
                  />
                </div>
                {renderInitialNodes(currentNode)}
              </div>
            )}
      </div>
      {showForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={handleCloseForm}>
              &times;
            </span>
            <form onSubmit={handleSubmit} className={styles.form}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                ID:
                <input
                  type="id"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </label>
              {userRole === "admin" && <button type="submit">Add Child</button>}
            </form>
            {error && (
              <div className={styles.error}>Error: {error.message}</div>
            )}
            {success && (
              <div className={styles.success}>Child added successfully!</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
