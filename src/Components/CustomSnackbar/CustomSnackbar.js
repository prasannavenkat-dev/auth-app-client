import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const CustomSnackbar = ({message,openSnackbar,handleCloseSnackbar,snackbarInfo}) => {

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



  return (
    <Snackbar
    anchorOrigin={{  vertical: 'top',
    horizontal: 'center' }}
    open={openSnackbar}
    onClose={handleCloseSnackbar}
    autoHideDuration={6000} >

<Alert onClose={handleCloseSnackbar} severity={snackbarInfo.type} sx={{ width:"100%",textAlign:"center",alignItems:"center" }}>
   
{snackbarInfo.message}
  </Alert>

  </Snackbar>
  )
}

export default CustomSnackbar