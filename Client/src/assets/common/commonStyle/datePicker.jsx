import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import '../commonStyle/Common.css';
import '../commonStyle/Modal.css'

export default function CommonlyUsedComponents(props) {

  const handleDateChange = (date) => {
    props.setTaskDate(date);
  };

  return (
    <LocalizationProvider 
       dateAdapter={AdapterDayjs}
    >
      <DemoContainer 
        components={['DesktopDatePicker']} 
        className="custom-date-picker-container"
      >
        <DemoItem>
          <div 
            className="custom-date-picker"
          >
            <DesktopDatePicker 
              defaultValue={dayjs(props.task_date)} 
              onChange={handleDateChange}
              sx={{
                '&  .MuiInputBase-root': {
                    width: '435px',
                    border: '1px solid black'
                }
             }}
            />
          </div>
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
