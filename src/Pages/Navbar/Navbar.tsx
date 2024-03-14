import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LocalMoviesOutlinedIcon from "@mui/icons-material/LocalMoviesOutlined";
import { useNavigate } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeContext } from "../theme/ThemeContextProvider";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
// import { alpha } from "@mui/system";
import { InputBase } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../redux/reduxTools/WishlistandWatchlist";
import { userData } from "../redux/reduxTools/HandleUserLogin";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  // borderRadius: theme.shape.borderRadius,
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  // '&:hover': {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
  // marginRight: theme.spacing(2),
  // marginLeft: 0,
  // width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
  // [theme.breakpoints.up('sm')]: {
  //   marginLeft: theme.spacing(3),
  //   width: 'auto',
  // },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  // padding: theme.spacing(0, 2),
  // height: '100%',
  // position: 'absolute',
  // pointerEvents: 'none',
  // display: 'flex',
  // alignItems: 'center',
  // justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  // color: 'inherit',
  // '& .MuiInputBase-input': {
  //   padding: theme.spacing(1, 1, 1, 0),
  //   // vertical padding + font size from searchIcon
  //   paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  //   transition: theme.transitions.create('width'),
  //   width: '100%',
  //   [theme.breakpoints.up('md')]: {
  //     width: '20ch',
  //   },
  // },
}));

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // MUI
  const { mode, toggleColorMode } = useThemeContext();
  localStorage.setItem("theme", JSON.stringify(mode));

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const isLoged = localStorage.getItem("user");

  const pages = ["Home", "Discover", "Popular", "Top"];
  // const User = useSelector((state: any) => state.Login.user);

  const WishN = useSelector((state: any) =>
    isLoged ? state.Login.user.wishlist?.length : 0
  );
  const WatchN = useSelector((state: any) =>
    isLoged ? state.Login.user.watched?.length : 0
  );
  const settings = [
    "Profile",
    `Watched ${WatchN}`,
    `Wishlist ${WishN}`,
    `${localStorage.getItem("user") ? "logout" : "login"}`,
  ];
  // end MUI

  const profilePic = useSelector(
    (state: string | any | null) => state.Login.user.image
  );
  const [search, setSearch] = useState(String);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    navigate(`Search/${search}`);
  };
  const handleLogout = (e: any) => {
    localStorage.removeItem("user");
    dispatch(userData({}));
    dispatch(Logout(e));
  };

  return (
    <AppBar
      position="fixed"
      sx={{ background: "linear-gradient(180deg, #000, #0000003a)" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LocalMoviesOutlinedIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 800,
              letterSpacing: ".3rem",
              color: "inhirit",
              textDecoration: "none",
            }}
          >
            Mo🎬ie W🌐rld
          </Typography>

          {/* responsive */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  // onChange={(e: any) => handleSearch(e)}
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    navigate(page === "Home" ? "/" : page);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <LocalMoviesOutlinedIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              flexWrap: "wrap",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: "0",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Mo🎬ie <div>W🌐rld</div>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  navigate(page === "Home" ? "/" : page);
                  handleCloseNavMenu();
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
            <Search
              onChange={(e: any) => {
                setSearch(e.target.value);
              }}
              onKeyDown={(e: any) => {
                if (e.key === "Enter") {
                  handleSearch(e);
                }
              }}
            >
              <SearchIconWrapper>
                <SearchIcon
                  sx={{ cursor: "pointer" }}
                  onClick={(e: any) => {
                    handleSearch(e);
                  }}
                />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={profilePic ? profilePic : ""} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={(e: any) => {
                      if (setting === "logout") {
                        handleLogout(e);
                        // localStorage.removeItem("user");
                      } else if (setting === `Watched ${WatchN}`) {
                        navigate("Watched");
                      } else if (setting === `Wishlist ${WishN}`) {
                        navigate("Wishlist");
                      } else {
                        navigate(setting);
                      }
                    }}
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
              <Box
                onClick={toggleColorMode}
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  gap: "1px",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "5px",
                  margin: "a",
                }}
              >
                {mode}
                <IconButton sx={{ ml: 0 }} color="inherit">
                  {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Box>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
