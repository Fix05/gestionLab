import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'
import { es } from 'date-fns/locale';

import { addDays } from 'date-fns';
import { DateRange } from 'react-date-range'
import { useState } from 'react';

export default function DateeRangePicker({ ranges, setRanges }) {


  return (
    <DateRange
      editableDateInputs={true}
      onChange={item => setRanges([item.selection])}
      moveRangeOnFirstSelection={false}
      ranges={ranges}
      locale={es}
      dateDisplayFormat="dd/MM/yyyy"
    />
  )
}


/* import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

export default function DateeRangePicker() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateRangePicker']}>
                <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
            </DemoContainer>
        </LocalizationProvider>
    );
} */