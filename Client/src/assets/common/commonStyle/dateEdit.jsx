import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import '../commonStyle/Common.css';
import '../commonStyle/Modal.css'

export default function EditDateEPicker(props) {

  const handleDateChange = (date) => {
    const formattedDate = date.format();
    props.setEditDate(formattedDate);
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
              defaultValue={dayjs(props.taskVal)} 
              onChange={handleDateChange}
              disabled={props.disabled}
              sx={{
                '&  .MuiInputBase-root': {
                    width: '435px',
                    marginLeft: '25px'
                }
             }}
            />
          </div>
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
