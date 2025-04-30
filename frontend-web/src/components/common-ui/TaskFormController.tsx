import { Box, Grid, Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Asset } from "@assets/registry";
import { TextInput } from "@components/TextInput";
import { useFormManager } from "@hooks/useForm";
import { SelectInput } from "@components/SelectInput";
import { StatusOptions } from "@utils/contants";
import { AppButton } from "@components/Button";
import { dialogStore } from "@store/DialogStore";
import { Task } from "@utils/types";
import CustomDatePicker from "@components/DatePicker";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { getStatusValue } from "@utils/common";

dayjs.extend(utc);


interface TokenFormProps {
  task?: Task;
  onSubmit: (task: Task) => void;
  type:"ADD" |"UPDATE"

}
export const TaskFormController: React.FC<TokenFormProps> = observer(
  ({ task, onSubmit,type }) => {
   
    const {
      formState,
      handleFieldChange,
      getFormData,
      onFormSubmit,
      setSubmitAttempt,
    } = useFormManager<Task>({
          title: "",
          description: "",
          dueDate: "",
          ...task
    
    });

    const handleonSubmit = () => {
      const optional_fields: (keyof Task)[] = [];
      if (type==='ADD') {
        optional_fields.push('status');
      }
      const { isValid, data } = onFormSubmit({
        excludeFields: optional_fields,
      });
      if(!isValid){
        dialogStore.open({
          title: "Form",
          subtitle: "Please fill all required fields ",
          rightButton: {
            onClick: () =>{}
          },
          open: true,
        });
      }else{
        console.log({status:data.status,www:getStatusValue((data.status as string)??'') as number})
        onSubmit({
          ...data,
          dueDate: dayjs(data.dueDate).utc().toISOString(),
          status: getStatusValue((data.status as string)??'') as number,
        });        
      }
      setSubmitAttempt();
    };

    return (
      <Stack spacing={5} direction={"column"}>
        <Stack direction={'column'} spacing={5}>
    
                <TextInput
                label="Title"
                onChange={handleFieldChange('title')}
                placeholder="Enter task title"
                value={formState.title}
              />
               <TextInput
                label="Task Description"
                onChange={handleFieldChange("description")}
                placeholder="Enter Brief description"
                value={formState.description}
              />
              <SelectInput
                label="Status"
                onChange={handleFieldChange('status')}
                placeholder="Select status"
                value={formState.status?.toString()}
                options={StatusOptions}
              />
            
          <CustomDatePicker label="Due Date" value={formState.dueDate ?dayjs(formState.dueDate) : null } onChange={handleFieldChange('dueDate')}/>
        
        </Stack>

        <Box top={5}>
          <AppButton
            onClick={handleonSubmit}
            label={task? "Update":"Save"}
            icon={Asset.icon.Bolt}
          />
        </Box>
      </Stack>
    );
  }
);
