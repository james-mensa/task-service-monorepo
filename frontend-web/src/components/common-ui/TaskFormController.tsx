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
        onSubmit(data)
      }
      setSubmitAttempt();
    };

    return (
      <Stack spacing={5} direction={"column"}>
        <Box>
    
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
                value={formState.status}
                options={StatusOptions}
              />
              <TextInput
                label="Due Date"
                onChange={handleFieldChange('dueDate')}
                placeholder="Enter Due Time"
                value={formState.dueDate?.toString()}
             
              />
            
          
        
        </Box>

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
