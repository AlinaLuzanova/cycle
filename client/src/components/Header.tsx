import React, { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
//import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
//import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import styles from "../styles/Header.module.css";
import {Link, useNavigate} from "react-router-dom";

interface Page {
  name: string;
  link: string;
}

interface Props {
  user: string;
}

const pagesBefore: Array<Page> = [
  { name: "SING IN", link: "/login" },
  { name: "SING UP", link: "/register" },
  { name: "ROUTES", link: "/" },
];

const pagesAfter: Array<Page> = [
  { name: "ROUTES", link: "/" },
  { name: "LOGOUT", link: "/logout" },
  { name: "CREATE ROUTE", link: "/createRoute" },
];

const settings: Array<Page> = [
  { name: "Profile", link: "/profile" },
  { name: "Logout", link: "/logout" },
];

const ResponsiveAppBar: FC<Props> = ({ user }) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
    };


  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      <AppBar>
        <Container className={styles.header}>
          <Toolbar disableGutters className={styles.toolbar}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link to="/">OnRoad</Link>
            </Typography>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {user
                ? pagesAfter.map((page) => (
                    <MenuItem key={page.name} onClick={page.name === "LOGOUT" ? handleLogout : handleCloseUserMenu}>
                      <Link to={page.link}>{page.name}</Link>
                    </MenuItem>
                  ))
                : pagesBefore.map((page) => (
                    <MenuItem key={page.name} onClick={handleCloseUserMenu}>
                      <Link to={page.link}>{page.name}</Link>
                    </MenuItem>
                  ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {user && (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
              )}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.name} onClick={setting.name === "Logout" ? handleLogout : handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.name}</Typography>
                    <Link to={setting.link}>{setting.name}</Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default ResponsiveAppBar;
