import React from 'react';
import './Signup.css';
const Signup = ({ navigate, userInfoHandle, userInfo, submit }) => {
  return (
    <>
      <div>
        <input type="text" placeholder="Name" name="name" value={userInfo.namae} onChange={userInfoHandle} />
      </div>

      <div>
        <input type="text" placeholder="Mobile" name="mobile" value={userInfo.mobile} onChange={userInfoHandle} />
      </div>
      <div>
        <input type="text" placeholder="Place" name="place" value={userInfo.place} onChange={userInfoHandle} />
      </div>

      <div style={{ marginBottom: '40px', height: '55px !important' }}>
        <input
          style={{ height: '45px', marginBottom: '10px' }}
          type="password"
          placeholder="Password"
          name="password"
          value={userInfo.password}
          onChange={userInfoHandle}
        />
      </div>
      <div>
        <button onClick={() => submit('signup')}>Sign up</button>
      </div>
      <div>
        <hr />
        <span className="link" onClick={() => navigate('/signin')}>
          Already have Account? Sign in
        </span>

        <hr />
      </div>
    </>
  );
};

export default Signup;
