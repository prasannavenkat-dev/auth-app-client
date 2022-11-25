import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResetPassword from '../ResetPassword/ResetPassword';
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';
import './Form.css';

import axios from 'axios';
import CustomSnackbar from '../CustomSnackbar/CustomSnackbar';

const Form = ({ page, setIsLoggedIn }) => {
  const [signUp, setSignUp] = useState(true);
  const [resetPass, setResetPass] = useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ email: '', name: '', mobile: '', place: '', password: '' });

  const [openSnackbar, setOpenSnackBar] = useState(false);
  const [snackbarInfo, setSnackbarInfo] = useState({ message: '', type: '' });

  function userInfoHandle(event) {
    if (event.target.name == 'mobile') {
      let value = event.nativeEvent;
      if (
        !(
          (value.data >= 0 && value.data <= 9 && userInfo.mobile.length < 10) ||
          value.inputType == 'deleteContentBackward'
        )
      ) {
        return;
      }
    }
    setUserInfo((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  useEffect(() => {
    setUserInfo(() => {
      return { email: '', name: '', mobile: '', place: '', password: '' };
    });
    if (page == 'signup') {
      document.title = 'Sign Up';
      setResetPass(false);
      setSignUp(true);
    } else if (page == 'signin') {
      document.title = 'Sign In';

      setResetPass(() => false);
      setSignUp(false);
    } else {
      document.title = 'Reset Password';

      setResetPass(true);
      setSignUp(false);
    }
  }, [page]);

  function submit(endpoint) {
    let url = `https://auth-app-server12.herokuapp.com/${endpoint}`;

    let params = {};

    if (endpoint == 'signin') {
      let email = userInfo.email;
      let password = userInfo.password;
      if (!email || !password || password.length < 8) {
        let message = '';
        if (!email && !password) {
          message = 'Missing Input Fields';
        } else if (!email) {
          message = 'Mail is Required';
        } else if (!password) {
          message = 'Password is Required';
        }

        if (password.length < 8 && password.length > 0) {
          message = 'Password should be greater than 8 characters';
        }

        setSnackbarInfo(() => {
          return { message, type: 'warning' };
        });
        setOpenSnackBar(() => true);
        return;
      }
      params = { email: userInfo.email, password: userInfo.password };
    } else if (endpoint == 'signup') {
      let { email, name, mobile, place, password } = userInfo;

      if (!email || !name || !mobile || !place || !password) {
        setSnackbarInfo(() => {
          return { message: 'Missing Input Fields', type: 'warning' };
        });
        setOpenSnackBar(() => true);
        return;
      }
      params = userInfo;
    } else {
      let { email } = userInfo;
      if (!email || !email.includes('@')) {
        let message = '';
        if (!email) {
          message = 'Mail is Required';
        } else {
          message = 'Enter valid mail';
        }
        setSnackbarInfo(() => {
          return { message, type: 'warning' };
        });
        setOpenSnackBar(() => true);
        return;
      }
      params = { email: userInfo.email };
    }

    callApi(url, params);
  }

  async function callApi(url, params) {
    try {
      let { data } = await axios.post(url, params, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });

      let message = data?.message || "Success";

      if (data.token) {
        window.sessionStorage.setItem('token', data.token);
        window.sessionStorage.setItem('email', userInfo.email);

        setIsLoggedIn(() => true);
        setUserInfo(() => {
          return { email: '', name: '', mobile: '', place: '', password: '' };
        });
        navigate('/profile');
      }

      setSnackbarInfo(() => {
        return { message, type: 'success' };
      });

      setOpenSnackBar(() => true);
    } catch (error) {
      let message = error?.response?.data?.message || 'Error Please Try Later';
      setSnackbarInfo(() => {
        return { message, type: 'error' };
      });

      setOpenSnackBar(() => true);
    }
  }

  const handleCloseSnackbar = () => {
    setOpenSnackBar(() => false);
  };

  return (
    <div className="login-signup-container" style={{ background: 'inherit' }}>
      <div className="login-signup">
        <div className="header">
          {resetPass ? (
            <h1>
              {' '}
              <span>Reset Password</span>
            </h1>
          ) : (
            <h1>{signUp ? <span>Sign Up</span> : <span>Sign In</span>}</h1>
          )}
        </div>
        <div style={{ height: resetPass && '60px', marginBottom: resetPass && '40px' }}>
          <input
            type="text"
            style={{ height: resetPass && '45px', marginBottom: resetPass && '10px' }}
            name="email"
            placeholder="Email"
            value={userInfo.email}
            onChange={userInfoHandle}
          />

          {resetPass && (
            <small style={{ padding: '8px', color: '#242424' }}>*Note : Password will be sent to this mail Id</small>
          )}
        </div>

        {signUp ? (
          <Signup navigate={navigate} userInfo={userInfo} userInfoHandle={userInfoHandle} submit={submit} />
        ) : (
          <>
            {!resetPass && (
              <Signin navigate={navigate} userInfo={userInfo} userInfoHandle={userInfoHandle} submit={submit} />
            )}
          </>
        )}

        {resetPass && <ResetPassword navigate={navigate} submit={submit} />}
      </div>
      <CustomSnackbar
        handleCloseSnackbar={handleCloseSnackbar}
        snackbarInfo={snackbarInfo}
        setSnackbarInfo={setSnackbarInfo}
        openSnackbar={openSnackbar}
        setOpenSnackBar={setOpenSnackBar}
      />
    </div>
  );
};

export default Form;
