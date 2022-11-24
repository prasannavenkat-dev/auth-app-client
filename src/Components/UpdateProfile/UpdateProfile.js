import React, { useEffect, useState } from 'react'
import axios from "axios";
import CustomSnackbar from '../CustomSnackbar/CustomSnackbar';

const UpdateProfile = ({ token, setToken, setSnackbarInfo, setOpenSnackBar, isLoading, setIsLoading }) => {
  const [profileInfo, setProfileInfo] = useState({ name: "", mobile: "", place: "" });
  const [previousInfo, setPreviousInfo] = useState({ name: "", mobile: "", place: "" });

  useEffect(() => {

    getProfileInfo();

  }, []);

  function profileHandle(event) {
    setProfileInfo((prev) => {
      return { ...prev, [event.target.name]: event.target.value }
    })

  }


  async function getProfileInfo() {
    let tokenStr = window.sessionStorage.getItem('token');
    let email = window.sessionStorage.getItem('email');
    setToken(() => tokenStr);
    let res1 = await axios.post("https://auth-app-server12.herokuapp.com/getProfile", { email, token: tokenStr });

    if (res1.status == 200) {
      let { name, mobile, place } = JSON.parse(res1.data.userData);


      setProfileInfo(() => {
        return { name, mobile, place }
      });


      setPreviousInfo(() => {
        return { name, mobile, place }
      })

    }
    //Set infos
  }

  async function updateProfileInfo() {

    let { name, mobile, place } = profileInfo;
    let email = window.sessionStorage.getItem("email");
    let message = ""


    if (!name || !mobile || !place) {
      message = "Missing Input Fields";
      setSnackbarInfo(() => {
        return { message, type: "warning" }
      })
      setOpenSnackBar(() => true)
      return
    }

    if (name == previousInfo.name && mobile == previousInfo.mobile && place == previousInfo.place) {
      message = "Please Change Atleast One Detail to Update Profile";
      setSnackbarInfo(() => {
        return { message, type: "warning" }
      })
      setOpenSnackBar(() => true)
      return
    }


    let url = "https://auth-app-server12.herokuapp.com/updateProfile";
    let body = { email, ...profileInfo, token }
    setIsLoading(() => true);

    try {


      let res1 = await axios.post(url, body);
      if (res1.status == 200) {
        message = res1.data.messsage
        setSnackbarInfo(() => {
          return { message, type: "success" }
        })
        setOpenSnackBar(() => true)
        getProfileInfo();
      }

      setTimeout(() => {
        setIsLoading(() => false);

      }, 2000)

    } catch (error) {

      let message = error.response.data.messsage || "Error Updating Profile"
      setSnackbarInfo(() => {
        return { message, type: "error" }
      })
      setOpenSnackBar(() => true)
      getProfileInfo();
    setTimeout(() => {
      setIsLoading(() => false);

    }, 2000)

  }

}




return (
  <div className='profileContainer'>

    <div>
      <span className='label'>Name</span>
      <input type="text" placeholder="Name" style={{ marginTop: "10px" }} name="name" value={profileInfo.name} onChange={profileHandle} />
    </div>

    <div>
      <span className='label' >Mobile</span>

      <input type="text" placeholder="Mobile" style={{ marginTop: "10px" }} name="mobile" value={profileInfo.mobile} onChange={profileHandle} />
    </div>


    <div>
      <span className='label'>Place</span>

      <input type="text" placeholder="Place" style={{ marginTop: "10px" }} name="place" value={profileInfo.place} onChange={profileHandle} />
    </div>

    <div style={{ marginBottom: "0", alignSelf: "center", width: "100%" }}>
      <button disabled={isLoading} onClick={updateProfileInfo}>Update Profile</button>
    </div>
  </div>
)
}

export default UpdateProfile