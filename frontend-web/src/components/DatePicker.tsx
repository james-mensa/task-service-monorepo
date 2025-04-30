import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Dayjs } from 'dayjs';

export interface DatePickerProps {
  value: Dayjs | null;
  onChange: (date: Dayjs | null) => void;
  label?: string;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({ value, onChange, label = "Select date" }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label={label} value={value} onChange={onChange} />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
