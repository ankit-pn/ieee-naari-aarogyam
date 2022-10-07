import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";
import { Avatar } from "@mantine/core";
// import NotificationsIcon from "@mui/icons-material/Notifications";

import logo from '../images/logo2.png'
 

const settings = ["Logout"];
const Navbar2 = () => {
  useEffect(() => {
    document.getElementById("root").firstChild.style = "none";
  });

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  var uid = localStorage.getItem('ID')

  const pages = (uid[1] == 'H')? [{'text' :  "View/Upload Docs" , 'loc' : '/hdocs'} , {'text' : "Blogs" , 'loc' : "/exercise/1"}]: [{'text' : "Track Periods" , 'loc' : '/home' } , {'text' :  "View documents" , 'loc' : '/udocs'}, {'text' : "Blogs" , 'loc' : "/exercise/1"}];
//   const routes = (uid[1] == 'H')? ["/hdocs" , "/exercise/1"]: ["/home", "/udocs", "/exercise/1"];
// const pages = (uid[1] == 'H')? [{'text' :  "View/Upload Docs" , 'loc' : '/hdocs'} , {'text' : "Blogs" , 'loc' : "/exercise/1"}]: [{'text' : "Track Periods" , 'loc' : '/home' } , {'text' :  "View documents" , 'loc' : '/udocs'}, {'text' : "Blogs" , 'loc' : "/exercise/1"}];
  uid = uid.slice(3,uid.length-1)



  return (
    <AppBar position="static">
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Avatar src={logo} alt='LOGO' size='md' mx='sm'/>
          <Typography
            variant="h6"
            noWrap
            mx='lg'
            component="a"
            href="/"
            color={'black'}
            // sx={{
            //   mr: 2,
            //   display: { xs: "none", md: "flex" },
            //   fontFamily: "monospace",
            //   fontWeight: 400,
            //   letterSpacing: ".3rem",
            //   color: "inherit",
            //   textDecoration: "none",
            // }}
            
          >
            Naari Aarogyam
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              {/* <MenuIcon /> */}
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
              mx='md'
            >
              {pages.map((page) => (
                <MenuItem key={page['text']} onClick={handleCloseNavMenu}>
                  <Button mx='md'>{page['text']}</Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => ( 
               <Button
                key={page['text']}
                mx='lg'
                onClick={()=>{
                    handleCloseNavMenu()
                    window.location.replace(page['loc'])
                }}
                sx={{ my: 2, color: "black", display: "block" , maxWidth : '20%'}}
              >
                {page['text']}
              </Button>
            ))}
          </Box>
          
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <Button onClick={handleOpenUserMenu} sx={{ p: 0 , color : '#222' , border : '2px solid black'}}>
                {uid}
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: "45px"}}
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Button onClick={()=>{
                    localStorage.removeItem('ID')
                    localStorage.removeItem('Token')
                    window.location.replace('/login')
                  }}>{setting}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar2;