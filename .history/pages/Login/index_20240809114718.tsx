import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import Navbar from '@/Components/Navbar'

const Index = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/home");
    }

    const handlePopState = () => {
      router.push("/home");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    localStorage.setItem("id", email);
    try {
      const loginResponse = await axios.post(
        "https://www.referback.trollsufficient.com/admin/login",
        { email, password }
      );
      const { token, role } = loginResponse.data;
      localStorage.setItem("accessToken", token);
      localStorage.setItem("role", role);

       const userResponse = await axios.post(
        "https://www.referback.trollsufficient.com/admin/user",
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const userName = userResponse.data.name;
      const userId = userResponse.data.id;
      localStorage.setItem("userName", userName);
      localStorage.setItem("userId", userId); // Save userId for later use

      const coinsResponse = await axios.get(
        `https://www.referback.trollsufficient.com/admin/coins/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const userCoins = coinsResponse.data.coins;
      localStorage.setItem("userCoins", userCoins);
      router.push("/home");
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("id");
      if (token && userId) {
        await axios.put(
          `https://www.referback.trollsufficient.com/admin/set-password/${userId}`,
          { password: newPassword }
        );

        alert("Password changed successfully.");
        setNewPassword("");
        setConfirmPassword("");
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("There was an error changing the password. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setIsPasswordModalOpen(false);
  };

  const handleOpenModal = () => {
    // setIsPasswordModalOpen(true);
    console.log("click here");
  };

  return (
    <> <Navbar />
    <div className={styles.loginContainer}>
     
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
        </div>
      )}
      <button 
        className={styles.backButton} 
        onClick={() => router.back()} 
        aria-label="Go Back"
      >
      </button>
      <div className={styles.loginForm}>
        <h1 className={styles.header}>Login First to View User Details and Message Us</h1>
        <h2 className={styles.loginTitle}>LOGIN</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="current-username"
            />
            <label>User Id</label>
            <div className={styles.inputUnderline}></div>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <label>Password</label>
            <div className={styles.inputUnderline}></div>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.button_login}> 
            <button
              type="submit"
              className={styles.loginButton}
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
        {/* <button
          className={styles.forgotPasswordButton}
          onClick={handleOpenModal}
        >
          Forgot Password
        </button> */}
      </div>

      {/* {isPasswordModalOpen && (
        <div className={styles.modalBackdrop} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Change Password</h3>
            <div className={styles.modalColumn}>
              <label>New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div className={styles.modalColumn}>
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>
            <button onClick={handleChangePassword}>
              Set Password
            </button>
          </div>
        </div>
      )} */}
    </div>
    </>
  );
};

export default Index;
