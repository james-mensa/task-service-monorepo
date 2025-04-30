import { AppButton } from "@components/Button";
import CustomDatePicker from "@components/DatePicker";
import { SelectInput } from "@components/SelectInput";
import {
  SelectChangeEvent,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Chip
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useState } from "react";
import utc from "dayjs/plugin/utc";
import { FilterCardProps, FilterProps } from "@utils/types";
import { StatusOptions } from "@utils/contants";
import { getStatusValue } from "@utils/common";

dayjs.extend(utc);

interface StatusOption {
  label: string;
  value: string;
}



export const FilterCard = ({ onChange }: FilterCardProps) => {
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [dueDateFilter, setDueDateFilter] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleStatusChange = useCallback((event: SelectChangeEvent<string>) => {
    setStatusFilter(event.target.value as string);
  }, []);

  const handleDateChange = useCallback((date: Dayjs | null) => {
    setDueDateFilter(date ? date.toISOString() : "");
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = () => {
    const status = statusFilter ? getStatusValue(statusFilter) : undefined;
    const dueDate = dueDateFilter ? dayjs(dueDateFilter).utc().toISOString() : "";

 
    onChange({
      status,
      dueDate, 
    });
    handleClose();
  };

  const resetDate=()=>{
    setDueDateFilter("");
    onChange({
      status: getStatusValue(statusFilter),
    });

  }
  const resetStatus=()=>{
    setStatusFilter("");
    onChange({
      dueDate:dayjs(dueDateFilter).utc().toISOString(), 
    });

  }
  return (
    <>
    <Stack direction="row" spacing={1} mb={2}>
      {statusFilter && (
        <Chip
          label={`Status: ${statusFilter}`}
          onDelete={resetStatus}
          color="primary"
          variant="outlined"
        />
      )}
      {dueDateFilter && (
        <Chip
          label={`Due Date: ${dayjs(dueDateFilter).format("YYYY-MM-DD")}`}
          onDelete={resetDate}
          color="primary"
          variant="outlined"
        />
      )}
    </Stack>

    <AppButton type="Secondary" onClick={handleOpen} label="Filters" />

    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Filter Options</DialogTitle>
      <DialogContent>
        <Stack direction="column" spacing={3} alignItems="center">
          <SelectInput
            label="Status"
            value={statusFilter}
            placeholder="Filter by Status"
            onChange={handleStatusChange}
            options={StatusOptions}
          />
          <CustomDatePicker
            label="Due Date"
            value={dueDateFilter ? dayjs(dueDateFilter) : null}
            onChange={handleDateChange}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <AppButton onClick={handleClose} label="Close" />
        <AppButton onClick={handleApply} label="Apply" />
      </DialogActions>
    </Dialog>
  </>
  );
};
