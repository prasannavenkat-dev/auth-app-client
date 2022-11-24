import './App.css';
import Form from './Components/Form/Form';
import Profile from './Components/Profile/Profile';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProtectedRoute({ isLoggedIn, setIsLoggedIn, isLoading, setIsLoading, token, setToken }) {
  return (
    <>
      {isLoggedIn ? (
        <Profile
          setIsLoggedIn={setIsLoggedIn}
          token={token}
          setToken={setToken}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      ) : (
        <Navigate to="/signin" />
      )}
    </>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [token, setToken] = useState('');

  useEffect(() => {
    let tokenStr = window.sessionStorage.getItem('token');

    if (tokenStr) {
      setIsLoggedIn(() => true);
    } else {
      setIsLoggedIn(() => false);
    }
  }, [token]);

  return (
    <div
      className="App"
      style={{
        backgroundImage: 'url("images/bg-2.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Routes>
        <Route exact path="/" element={isLoggedIn ? <Navigate to="/profile" /> : <Navigate to="/signin" />} />
        <Route
          path="/signin"
          element={
            <Form page="signin" setIsLoggedIn={setIsLoggedIn} isLoading={isLoading} setIsLoading={setIsLoading} />
          }
        />
        <Route
          path="/signup"
          element={
            <Form page="signup" setIsLoggedIn={setIsLoggedIn} isLoading={isLoading} setIsLoading={setIsLoading} />
          }
        />
        <Route
          path="/resetUser"
          element={
            <Form page="resetPass" setIsLoggedIn={setIsLoggedIn} isLoading={isLoading} setIsLoading={setIsLoading} />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              token={token}
              setToken={setToken}
              setIsLoggedIn={setIsLoggedIn}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
