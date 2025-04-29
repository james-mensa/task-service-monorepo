import { Container, IconButton, Stack, Typography } from "@mui/material";

import { grey } from "@mui/material/colors";

import { Asset } from "@assets/registry";
import { dialogStore } from "@store/DialogStore";

import { useNavigate } from "react-router-dom";
import routePath from "@config/paths";
import { taskApi } from "@apis/task";
import { TaskFormController } from "@components/common-ui/TaskFormController";
import { Task } from "@utils/types";

export const AddTaskPage = () => {
    const navigate = useNavigate();
  const handleSubmit = (task: Task) => {
    dialogStore.open({
      title: "New Token",
      subtitle: "click continue to add new token",
      rightButton: {
        onClick: () => makeApiCall(task),
      },
      open: true,
    });
  };
  const makeApiCall = async (task: Task) => {
    try {
      const res = await taskApi.createTask(task);
      dialogStore.open({
        title: "New Task",
        subtitle: res.message ?? "Request successfull",
        rightButton: {
          onClick: () => dialogStore.close(),
          label: "Okay",
        },
        open: true,
      });
    } catch (err) {}
  };
  return (
    <Container maxWidth={"md"}>
      <Stack direction={"column"} pt={5}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          mb={10}
        >
          <Typography variant="h6" fontWeight={700} color={grey[700]}>
            Task Form
          </Typography>
          <Stack direction={"row"} alignItems={"center"}>
            <IconButton onClick={()=>navigate(routePath.HOME_PATH)}>{Asset.icon.Back}</IconButton>
            <Typography fontWeight={600} fontSize={14} color={grey[600]}>
              Back
            </Typography>
          </Stack>
        </Stack>
        <TaskFormController type="ADD" onSubmit={handleSubmit} />
      </Stack>
    </Container>
  );
};
