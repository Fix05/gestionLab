import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'
import { es } from 'date-fns/locale';

import { DateRange } from 'react-date-range'


export default function DateeRangePicker({ ranges, setRanges }) {



  return (
    <DateRange
      editableDateInputs={true}
      onChange={item => setRanges([item.selection])}
      moveRangeOnFirstSelection={false}
      ranges={ranges}
      locale={es}
      dateDisplayFormat="dd/MM/yyyy"
      minDate={new Date()}
    />
  )
}
