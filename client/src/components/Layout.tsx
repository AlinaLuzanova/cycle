import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "./Header.tsx";
import Footer from "./Footer.tsx";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
    const [user, setUser] = useState<string>('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <div>
            <ResponsiveAppBar user={user}/>
            <Outlet/>
            <Footer />
        </div>
    );
};

export default Layout;
