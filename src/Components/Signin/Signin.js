import React  from 'react'

const Signin = ({ navigate,userInfo,userInfoHandle,submit }) => {

  

    
    return (
        <>
            <div style={{ marginBottom: "40px", height: "55px !important" }}>
                <input style={{ height: "45px", marginBottom: "10px" }} type="password" placeholder="Password" name="password" value={userInfo.password} onChange={userInfoHandle} />
                <small style={{ padding: "10px", color: "#242424", fontWeight: "bold", fontSize: "14px" }}
                    onClick={() => navigate("/resetUser")}

                >Forget Password?</small>
            </div>

            <div>
                <button
                 onClick={()=>submit("signin")}
                >
                Sign In</button>
            </div>

            <div>
                <hr />
                <span className="link" onClick={() => navigate("/signup")}>

                    New User? Sign up</span> <hr />
            </div>
        </>
    )
}

export default Signin