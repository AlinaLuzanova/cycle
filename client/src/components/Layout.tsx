import React from "react";
import ResponsiveAppBar from "./Header.tsx";
import Footer from "./Footer.tsx";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Outlet />
      <Footer />
    </>
  );
};
export default Layout;
