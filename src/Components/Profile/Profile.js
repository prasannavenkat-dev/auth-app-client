import React, { useEffect } from 'react';
import './Profile.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChangePassword from '../ChangePassword/ChangePassword';
import UpdateProfile from '../UpdateProfile/UpdateProfile';
import CustomSnackbar from '../CustomSnackbar/CustomSnackbar';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PortraitIcon from '@mui/icons-material/Portrait';
import DragHandleIcon from '@mui/icons-material/DragHandle';
const Profile = ({ setIsLoggedIn, isLoading, setIsLoading, token, setToken }) => {
  const [isProfile, setIsProfile] = useState(false);

  const [userMail, setUserMail] = useState('');
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackBar] = useState(false);
  const [snackbarInfo, setSnackbarInfo] = useState({ message: '', type: '' });
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  function signOut() {
    window.sessionStorage.clear();
    setIsLoggedIn(() => false);
    navigate('/signin');
  }

  useEffect(() => {
    document.title = 'Profile';
    let tokenStr = window.sessionStorage.getItem('token');
    let email = window.sessionStorage.getItem('email');
    setToken(() => tokenStr);
    setUserMail(() => email);
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackBar(() => false);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <div className="profilePage" style={{ backgroundColor:"#eee5e0",backgroundImage: 'url("images/bg-1.jpg")' }}>
      <div className="navbar">
        <div>
          {/* <img src="images/logo.png" style={{width:"10%"}}/> */}
          <PortraitIcon sx={{ fontSize: 45, color: '#40332b' }} />
        </div>

        <Box
          sx={{
            display: { xs: 'none', sm: 'none', md: 'flex' },
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '40%',
          }}
        >
          <div className="menuLink" onClick={() => setIsProfile(true)}>
            Update Profile
          </div>

          <div className="menuLink" onClick={() => setIsProfile(false)}>
            Change Password
          </div>

          <div className="menuLink" onClick={signOut}>
            Sign Out
          </div>
        </Box>

        <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon sx={{ color: '#40332b' }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            <MenuItem key={1} onClick={handleCloseNavMenu}>
              <Typography textAlign="center">
                <div className="menuLink" onClick={() => setIsProfile(true)}>
                  Update Profile
                </div>
              </Typography>
            </MenuItem>
            <MenuItem key={2} onClick={handleCloseNavMenu}>
              <Typography textAlign="center">
                <div className="menuLink" onClick={() => setIsProfile(false)}>
                  Change Password
                </div>
              </Typography>
            </MenuItem>{' '}
            <MenuItem key={3} onClick={handleCloseNavMenu}>
              <Typography textAlign="center">
                <div className="menuLink" onClick={signOut}>
                  Sign Out
                </div>
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </div>
      {isProfile ? (
        <UpdateProfile
          token={token}
          setToken={setToken}
          setOpenSnackBar={setOpenSnackBar}
          setSnackbarInfo={setSnackbarInfo}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      ) : (
        <ChangePassword
          token={token}
          setToken={setToken}
          email={userMail}
          setOpenSnackBar={setOpenSnackBar}
          setSnackbarInfo={setSnackbarInfo}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}

      <CustomSnackbar
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        snackbarInfo={snackbarInfo}
      />
    </div>
  );
};

export default Profile;
