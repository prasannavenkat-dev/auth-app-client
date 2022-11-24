import './App.css';
import Form from './Components/Form/Form';
import Profile from './Components/Profile/Profile';
import { Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from 'react';



function ProtectedRoute({isLoggedIn,setIsLoggedIn,isLoading,setIsLoading}){


  return(
    <>
      {isLoggedIn ? <Profile setIsLoggedIn={setIsLoggedIn} isLoading={isLoading} setIsLoading={setIsLoading} /> : <Navigate to="/signin" />}
    </>
  )
}

function App() {

const [isLoggedIn,setIsLoggedIn] = useState(false);

const [isLoading,setIsLoading] = useState(false);





useEffect(() => {

   let token = window.sessionStorage.getItem("token")
   
   if(token)
   {
    setIsLoggedIn(()=>true);
   }
   else{
    setIsLoggedIn(()=>false);

   }


}, [isLoggedIn])




  return (


    <div className="App" style={{backgroundImage:'url("images/bg-2.jpg")',backgroundSize:"cover",backgroundPosition:"center center",backgroundRepeat:"no-repeat"}} >
    <Routes>
    <Route exact path="/"  element={<ProtectedRoute isLoggedIn={isLoggedIn} />} />
    <Route  path="/signin" element={<Form page="signin" setIsLoggedIn={setIsLoggedIn} isLoading={isLoading} setIsLoading={setIsLoading} />}/>
    <Route  path="/signup" element={<Form page="signup" setIsLoggedIn={setIsLoggedIn} isLoading={isLoading} setIsLoading={setIsLoading}/>}/>
    <Route  path="/resetUser" element={<Form page="resetPass" setIsLoggedIn={setIsLoggedIn} isLoading={isLoading} setIsLoading={setIsLoading} />}/>
    <Route  path="/profile" element={<ProtectedRoute isLoggedIn={isLoggedIn}  setIsLoggedIn ={setIsLoggedIn} isLoading={isLoading} setIsLoading={setIsLoading} />} />
    </Routes>
    </div>
  );
}

export default App;
