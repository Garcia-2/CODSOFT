import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import {Link, useLocation} from 'react-router-dom'
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useAuth } from '../AuthContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import LogoutIcon from '@mui/icons-material/Logout';

export default function NavBar({ drawerWidth, content, cartItems }) {
  const { authenticated, logout } = useAuth();
  const location = useLocation()
  const path = location.pathname

  const [open, setOpen] = React.useState(false);

  const changeOpenStatus = () => {
    setOpen(!open)
  }

  const myDrawer = (
    <div>
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            
              <ListItem disablePadding>
                <ListItemButton component={Link} to="" selected={"/" === path}>
                  <ListItemIcon>
                        <HomeIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/about" selected={"/about" === path}>
                  <ListItemIcon>
                        <InfoIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"About"} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/cart" selected={"/cart" === path}>
                  <ListItemIcon>
                        <ShoppingCartIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"Cart"} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/checkout" selected={"/checkout" === path}>
                  <ListItemIcon>
                        <PointOfSaleIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"Checkout"} />
                </ListItemButton>
              </ListItem>

              {authenticated ? (
                <ListItem disablePadding key="logout">
                  <ListItemButton onClick={logout}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Logout"} />
                  </ListItemButton>
                </ListItem>
              ) : (
                [
                  <ListItem disablePadding key="login">
                    <ListItemButton component={Link} to="/login" selected={"/login" === path}>
                      <ListItemIcon>
                        <LoginIcon />
                      </ListItemIcon>
                      <ListItemText primary={"Login"} />
                    </ListItemButton>
                  </ListItem>,

                  <ListItem disablePadding key="register">
                    <ListItemButton component={Link} to="/register" selected={"/register" === path}>
                      <ListItemIcon>
                        <HowToRegIcon />
                      </ListItemIcon>
                      <ListItemText primary={"Register"} />
                    </ListItemButton>
                  </ListItem>
                ]
              )}
        </List>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>

          <IconButton 
                color = "inherit"
                onClick={changeOpenStatus}
                sx={{mr:2,display:{sm:"none"}}}
                >
                <MenuIcon/>
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            Kid Drip
          </Typography>
        </Toolbar>
      </AppBar>


      <Drawer
        variant="permanent"
        sx={{
          display: {xs:"none", sm:"block"},
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {myDrawer}
        
      </Drawer>

      <Drawer
        variant="temporary"
        open = {open}
        onClose={changeOpenStatus}
        sx={{
          display: {xs:"block", sm:"none"},
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {myDrawer}
        
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        {content}
        
      </Box>
    </Box>
  );
}