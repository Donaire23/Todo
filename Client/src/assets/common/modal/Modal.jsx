import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import CommonlyUsedComponents from '../commonStyle/datePicker';
import CustomSpinner from '../Spinner/Spinner';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 380,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

const Modals = (
  { open, handleClose, 
    task_name, 
    task_description, 
    task_date, setTaskName, 
    setTaskDescription, 
    setTaskDate, handleAddTask,
    showSpinner,
    rejected
  }) => {

  return (
    

    <>
        <CustomSpinner spin={showSpinner}/>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" com  ponent="h2" >
              <TextField
              label='Task Name' 
              className={`col-lg-12 mb-2 ${rejected ? 'input-rejected' : ''}`}
              value={task_name}
              onChange={(e) => setTaskName(e.target.value) }
              />
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <TextField
                label='Description' 
                className={`col-lg-12 mb-3 ${rejected ? 'input-rejected' : ''}`}
                value={task_description}
                onChange={(e) => setTaskDescription(e.target.value)}
                />
            </Typography>

            <CommonlyUsedComponents 
              task_date={task_date} 
              setTaskDate={setTaskDate}
            />

            <hr className='mt-5 mb-4'/>

            <div className='d-flex justify-content-end col-lg-12'>

              <Button 
                onClick={() => handleAddTask()} 
                className='fs-5 text-black'>
                  <i class="fa-solid fa-plus"></i>
              </Button>

              <Button 
                onClick={handleClose} 
                className='fs-5 text-black'>
                  <i class="fa-solid fa-xmark"></i>
                </Button>
            </div>

         
    
          </Box>
        
        </Fade>
       
      </Modal>
     
    </>
  );
};

export default Modals;
