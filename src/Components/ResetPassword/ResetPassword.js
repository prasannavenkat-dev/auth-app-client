import React from 'react'

const ResetPassword = ({ navigate,submit,}) => {


    return (
        <>
            <div>
            <button
                 onClick={()=>submit("forgotPassword")}
                >                
                Reset Password</button>
            </div>
            <div>
                <hr />
                <span className="link" onClick={() => navigate("/signup")}>
                    New User? Sign up
                </span> <hr />
            </div>
        </>
    )
}

export default ResetPassword