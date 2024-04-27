import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import esLocale from 'dayjs/locale/es'
import { styled } from '@mui/system';



const StyledDatePicker = styled(DatePicker)({
  '& .Mui-focused': {
    outline: 'none',
  },
});


export default function MonthPickerViews({ minDate, maxDate }) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={esLocale}>

      <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
        <Box sx={{ width: '75%', height: '50%' }}>
          <StyledDatePicker
            label={'"Seleccione el mes"'}
            views={['month', 'year']}
            slotProps={{ textField: { size: 'small' } }}
          />
        </Box>
      </DemoContainer>

    </LocalizationProvider>
  );
}



