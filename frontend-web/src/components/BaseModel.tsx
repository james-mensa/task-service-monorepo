import * as React from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


interface BaseModelProps{
    children:React.ReactElement,
    isOpen:boolean
    handleClose?:()=>void
}
export const BaseModal=({children,isOpen,handleClose}:BaseModelProps)=> {


  return (
    <div>
     
      <Modal
        aria-labelledby="base-modal"
        open={isOpen}
        onClose={handleClose}>
        <Box 
        justifyContent={'center'} 
        alignItems={'center'}
        sx={style}
        >
        {children}
        </Box>
      </Modal>
    </div>
  );
}

const style = {
    width:"100%",
    height:"100%",
    display:'flex',
    justifyContent:'center',
    alignItem:'center',
    backgroundColor:'transparent'
  };