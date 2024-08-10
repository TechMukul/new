import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [coins, setCoins] = useState<number>(0);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Check authentication status and fetch user data
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("accessToken");
      const role = localStorage.getItem("role");

      setIsAuthenticated(true);
      setUserRole(role);

      const fetchCoins = async () => {
        if (token) {
          try {
            const userId = localStorage.getItem("userId");
            if (userId) {
              const response = await axios.get(
                `https://www.referback.trollsufficient.com/admin/coins/${userId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              setCoins(response.data.coins);
            }
          } catch (error) {
            console.error("Error fetching coins:", error);
          }
        }
      };

      fetchCoins();
    };

    checkAuth();
  }, []); // Run only on mount

  const handleLogout = async () => {
    // Remove items from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userCoins");
    localStorage.removeItem("role");

    // Reset state
    setCoins(0);
    setIsAuthenticated(false);
    setUserRole(null);

    // Redirect to home page
    router.push("/").then(() => {
      // Ensure the page reloads to reflect logout
      window.location.reload();
    });
  };

  return (
    <>
      <div className={style.hamburger} onClick={toggleMenu}>
        ☰
      </div>
      <div className={style.image}></div>
      <div className={style.search_box}>
        <input className={style.input} placeholder="Enter Favorite Skins" />
      </div>
      <ul className={`${style.caintainer} ${isMenuOpen ? style.showMenu : ""}`}>
        <li className={style.items}>
          <div className={style.name}>
            <Link href="/" style={{ textDecoration: "none", color: "white" }}>
              <p>Home</p>
            </Link>
            <hr className={style.line} />
          </div>
        </li>
        <li className={style.items}>
          <div className={style.name}>
            <Link href="/Tree" style={{ textDecoration: "none", color: "white" }}>
              <p>Alluser</p>
            </Link>
            <hr className={style.line} />
          </div>
        </li>
        <li className={style.items}>
          <div className={style.name}>
            <p>Skins</p>
            <hr className={style.line} />
          </div>
        </li>
        <li className={style.items}>
          <div className={style.name}>
            <Link href="/contact" style={{ textDecoration: "none", color: "white" }}>
              <p>Contact</p>
            </Link>
            <hr className={style.line} />
          </div>
        </li>
        <li className={style.items}>
          <div className={style.name}>
            {!isAuthenticated ? (
              <Link href="/Login" style={{ textDecoration: "none", color: "white" }}>
                <p>Login</p>
              </Link>
            ) : (
              <button className={style.links} onClick={handleLogout}>
                Logout
              </button>
            )}
            <hr className={style.line} />
          </div>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
