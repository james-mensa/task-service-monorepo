import { Container, IconButton, Stack, Typography } from "@mui/material";

import { grey } from "@mui/material/colors";

import { Asset } from "@assets/registry";
import { dialogStore } from "@store/DialogStore";

import { useNavigate, useParams } from "react-router-dom";
import routePath from "@config/paths";
import { taskApi } from "@apis/task";
import { TaskFormController } from "@components/common-ui/TaskFormController";
import { Task } from "@utils/types";
import { useEffect, useState } from "react";

export const UpdateTaskPage = () => {
    const { id } = useParams<{ id: string }>();
    const [task, setTask] = useState<Task>();
    const navigate = useNavigate();
  
    const fetchDetail = async () => {
      try {
        if (!id) {
          return;
        }
        const res = await taskApi.getTaskByID(id);
        if (!res.success) {
          dialogStore.open({
            title: "Alert",
            subtitle: res.message ?? "",
            rightButton: {
              onClick: () => navigate(routePath.HOME_PATH),
              label: "Go Back",
            },
            open: true,
          });
          setTimeout(() => {
            navigate(routePath.HOME_PATH);
            dialogStore.close();
          }, 5000);
        }
  
        if (res.data) {
          setTask(res.data);
        }
      } catch (err) {}
    };
    useEffect(() => {
      fetchDetail();
    }, []);
  
    const handleSubmit = (task: Task) => {
      dialogStore.open({
        title: "Modify",
        subtitle: "click continue to update task",
        rightButton: {
          onClick: () => makeApiCall(task),
        },
        open: true,
      });
    };
    const makeApiCall = async (task: Task) => {
      try {
        const res = await taskApi.updateTask(id ?? "", task);
  
        dialogStore.open({
          title: "Alert",
          subtitle: res.message ?? "",
          rightButton: {
            onClick: () => dialogStore.close(),
            label: "Okay",
          },
          open: true,
        });
      } catch (err) {}
    };
    if (id === undefined) {
      return null;
    }
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
        { task &&
        <TaskFormController task={task} type="UPDATE" onSubmit={handleSubmit} />
}
      </Stack>
    </Container>
  );
};
