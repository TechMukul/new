import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faUsers,
  faPhone,
  faSignOutAlt,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
// import logo from "@/public/logo.png";

const Header = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [redeemAmount, setRedeemAmount] = useState("");
  const [coin, setCoins] = useState<number>(0);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsFixed(scrolled);
      setBackgroundColor(scrolled ? "#006739" : "transparent");
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");
    setIsAuthenticated(!!token);
    setUserRole(role);

    const fetchCoins = async () => {
      if (token) {
        try {
          const userId = localStorage.getItem("userId");
          if (userId) {
            const coinsResponse = await axios.get(
              `https://www.referback.trollsufficient.com/admin/coins/${userId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            setCoins(coinsResponse.data.coins);
          }
        } catch (error) {
          console.error("Error fetching coins:", error);
        }
      }
    };

    fetchCoins();
  }, [isAuthenticated]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userCoins");
    localStorage.removeItem("role");
    setCoins(0);
    setIsAuthenticated(false);
    setUserRole(null);
    router.push("/");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsPasswordModalOpen(false);
  };

  const handleRedeemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRedeemAmount(e.target.value);
  };

  const handleRedeem = async () => {
    const coins = parseInt(redeemAmount, 10);
    if (isNaN(coins) || coins <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    if (coins > coin) {
      alert("You do not have enough coins to redeem this amount.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");
      if (token && userId) {
        await axios.post(
          `https://www.referback.trollsufficient.com/admin/redeem-coins`,
          { userId, coins },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setCoins(coin - coins);
        setRedeemAmount("");
        handleCloseModal();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error redeeming coins:", error);
      alert("There was an error redeeming coins. Please try again.");
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId"); // Make sure this is correct
      if (token && userId) {
        await axios.put(
          `https://www.referback.trollsufficient.com/admin/set-password/${userId}`,
          { password: newPassword },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
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

  return (
    <div className={styles.container}>
      <header
        className={`${styles.navbar} ${isFixed ? styles.fixed : ""}`}
        style={{ backgroundColor }}
      >
        <Navbar expand="lg" bg="transparent">
          <Container style={{height:"70px"}}>
            {/* <Link href="/" passHref legacyBehavior>
              <a className={styles.brand}>MyApp</a>
            </Link> */}
            <Navbar.Toggle
              aria-controls="navbarSupportedContent"
              onClick={handleToggle}
              >
              <span className={styles.menu_icon}>
                <FontAwesomeIcon
                  icon={faBars}
                  height={40}
                  width={40}
                  color="white"
                  className={styles.bar}
                />
              </span>
            </Navbar.Toggle>
            <Navbar.Collapse
              id="navbarSupportedContent"
              className={isOpen ? styles.show : ""}
            >
              <Nav className={styles.nav}>
                <div className={styles.logo}>
                  <Link href={"/home"}>
                    {/* <Image
                      src={logo}
                      alt="logo"
                      className={styles.logo}
                    ></Image> */}
                  </Link>
                </div>
                <div className={styles.nav}>
                  <Link href="/home" passHref legacyBehavior>
                    <a className={styles.links}>
                      <FontAwesomeIcon icon={faHome} className={styles.icon} />{" "}
                      Home
                    </a>
                  </Link>

                  <Link href="/Tree" passHref legacyBehavior>
                    <a className={styles.links}>
                      <FontAwesomeIcon icon={faUsers} className={styles.icon} />{" "}
                      All Users
                    </a>
                  </Link>

                  <Link href="/contact" passHref legacyBehavior>
                    <a className={styles.links}>
                      <FontAwesomeIcon icon={faPhone} className={styles.icon} />{" "}
                      Contact
                    </a>
                  </Link>
                  {!isAuthenticated ? (
                    <Link href="/Login" passHref legacyBehavior>
                      <a className={styles.links}>
                        <FontAwesomeIcon
                          icon={faSignOutAlt}
                          className={styles.icon}
                        />{" "}
                        Login
                      </a>
                    </Link>
                  ) : (
                    <>
                      <Button
                        variant="outline-light"
                        className={styles.links}
                        onClick={handleOpenModal}
                      >
                        <FontAwesomeIcon
                          icon={faBitcoin}
                          className={styles.icon}
                        />
                        Coins ({coin})
                      </Button>
                      <Button
                        variant="outline-light"
                        className={styles.links}
                        onClick={() => setIsPasswordModalOpen(true)}
                      >
                        <FontAwesomeIcon icon={faKey} className={styles.icon} />
                        Change Password
                      </Button>
                      <Button
                        variant="outline-light"
                        className={styles.links}
                        onClick={handleLogout}
                      >
                        <FontAwesomeIcon
                          icon={faSignOutAlt}
                          className={styles.icon}
                        />
                        Logout
                      </Button>
                    </>
                  )}
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      {isModalOpen && (
        <div className={styles.modalBackdrop} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalColumn}>
              <h3>
                Your Coins<span>&nbsp;&nbsp;&nbsp;{coin}</span>
              </h3>
              <div>
                {" "}
                <a
                  href="https://wa.me/+919643568010"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  click here to redeem code
                  <img
                    src="https://i.pinimg.com/originals/5a/5c/53/5a5c53a8cf5124a6681a5db0493b549a.png"
                    alt="Chat on WhatsApp"
                    // className={s.whatsappIcon}
                    style={{ height: "40px", width: "40px" }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {isPasswordModalOpen && (
        <div className={styles.modalBackdrop} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalColumn}>
              <h3>Change Password</h3>
              <Form.Group controlId="newPassword">
                <Form.Label>New Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </Form.Group>
            </div>
            <div className={styles.modalColumn}>
              <Button
                variant="success"
                onClick={handleChangePassword}
                className={styles.links}
                style={{
                  backgroundColor: "green",
                  color: "white",
                  padding: "5px",
                  marginTop: "5px",
                }}
              >
                Set Password
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
