import axios from 'axios';
import React, { useState } from 'react'

const ChangePassword = ({token,email,setSnackbarInfo,setOpenSnackBar,isLoading,setIsLoading}) => {
        

    const [passwordDetails,setPasswordDetails] = useState({oldPassword:"",newPassword:""});


    function passwordHandle(event){
        
        setPasswordDetails((prev)=>{
            return {...prev,[event.target.name]:event.target.value}
        })
    }

    async function resetPassword(){

        try {
            let message="";

            if(!(passwordDetails.oldPassword.length)||!(passwordDetails.newPassword.length)){
                message="Missing Input Fields";
                setSnackbarInfo(()=>{ 
                    return {message,type:"warning"}
                   })
                   setOpenSnackBar(()=>true)
                return
            }

            if((passwordDetails.oldPassword.length<8)){
                message="Enter Valid Password";
                setSnackbarInfo(()=>{ 
                    return {message,type:"warning"}
                   })
                   setOpenSnackBar(()=>true)
                return
            }


            
            if((passwordDetails.newPassword.length < 8)){
                message="Password Should Be atleast 8 characters";
                setSnackbarInfo(()=>{ 
                    return {message,type:"warning"}
                   })
                   setOpenSnackBar(()=>true)
                return
            }
      
        if(passwordDetails.oldPassword == passwordDetails.newPassword){
            message="Please use Different Password";
            setSnackbarInfo(()=>{ 
                return {message,type:"warning"}
               })
               setOpenSnackBar(()=>true)
            return
        }


      
       setIsLoading(()=>true);
          
        let url ="https://auth-app-server12.herokuapp.com/updatePassword";
        let body={email,...passwordDetails,token}

     
       let res1 = await axios.post(url,body,{
        headers: {
            'Access-Control-Allow-Origin': '*'
        }}
        );

       if(res1.status==200){

        setPasswordDetails(()=>{
            return {oldPassword:"",newPassword:""}
        })
        let message = res1.data.message;
        setSnackbarInfo(()=>{ 
            return {message,type:"success"}
           })
           setOpenSnackBar(()=>true)
       }
       
       setIsLoading(()=>false);


       console.log(res1)

    } catch (error) {

    let message=error?.response?.data?.message || "Password Change Failed";
    setSnackbarInfo(()=>{ 
    return {message,type:"error"}
   })
   setOpenSnackBar(()=>true)
   setIsLoading(()=>false);


    }

    }

  return (
    <div className='profileContainer'>

    <div>
       <span  className='label'>Old Password</span>
      <input type="password" placeholder="Old Password" style={{marginTop:"10px"}} name="oldPassword" value={passwordDetails.oldPassword} onChange={passwordHandle} />
    </div>

    <div>
    <span className='label'>New Password</span>
      <input type="password" placeholder="New Password" style={{marginTop:"10px"}} name="newPassword" value={passwordDetails.newPassword} onChange={passwordHandle} />
    </div>    

    <div style={{marginBottom:"0",alignSelf:"center",width:"100%"}}>
          <button onClick={resetPassword}>Change Password</button>
        </div>

  </div>
  )
}

export default ChangePassword