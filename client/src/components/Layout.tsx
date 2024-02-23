import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "./Header.tsx";
import Footer from "./Footer.tsx";
import { Outlet } from "react-router-dom";
import styles from "../styles/Main.module.css";

const Layout: React.FC = () => {
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <>
      <ResponsiveAppBar user={user} />
      <div className={styles.main}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
