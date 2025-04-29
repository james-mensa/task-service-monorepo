import { taskApi } from "@apis/task";
import { userApi } from "@apis/user";
import AppTable, { RowItem } from "@components/AppTable";
import { AppButton } from "@components/Button";
import { appConfig } from "@config/config";
import routePath from "@config/paths";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Chip,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { grey } from "@mui/material/colors";

import { dialogStore } from "@store/DialogStore";
import { Task } from "@utils/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [data, setData] = useState<Task[]>([]);
  const navigate=useNavigate()
  const fetch = async () => {
    try {
      const res = await taskApi.getTasks();
      console.log({tasks:res})
      if (res.data) {
        setData(res.data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleDelete = (task: Task) => {
    dialogStore.open({
      title: "Delete Token",
      subtitle: `click continue to delete token (${task}) `,
      rightButton: {
        onClick: () => makeDeleteApiCall(task)
      },
      open: true
    });
  };

  const makeDeleteApiCall = async (task: Task) => {
    try {
      const res = await taskApi.deleteTask(task.id ?? "");
      dialogStore.open({
        title: "Alert",
        subtitle: res.message ?? "",
        rightButton: {
          onClick: () => dialogStore.close(),
          label: "Okay"
        },
        open: true
      });
      fetch();
    } catch (err) {}
  };

  const RenderRowController = ({ item }: { item: RowItem<Task> }) => {
    return (
      
      <Stack direction={"row"} alignContent={"center"} spacing={2}>
        <Tooltip title="Delete Record">
          <IconButton
            onClick={() => handleDelete(item)}
            sx={{ borderRadius: 0 }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Update Record">
          <IconButton
            onClick={() => navigation(`/tokens/${item.id ?? ""}/update`)}
            sx={{ borderRadius: 0 }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    );
  };

  const navigation = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const logout=()=>{
    userApi.logout()
    navigate(routePath.LOGIN_FORM_PAGE)
  }
  return (
    <Container>
      <Stack direction={"column"} spacing={3} mt={10}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6" fontWeight={700} color={grey[800]}>
            Tasks
          </Typography>
          <Stack direction={'row'} alignItems={"center"}>
          <IconButton onClick={logout}> <Chip label={'Logout'} /></IconButton>
          <Chip label={`version: ${appConfig.app_version}`} />
          </Stack>
        
         
        </Stack>
        <Box width={200}>
          <AppButton
            onClick={() => navigation(routePath.ADD_TASK_PAGE)}
            label="Add New Task"
          />
        </Box>

        <AppTable<Task>
          data={data}
          headerLabels={isMobile ? smheaderLabels : lgheaderLabels}
          dataKeys={isMobile ? smdataKeys : lgdataKeys}
          rowComponent={RenderRowController}
    
        />
      </Stack>
    </Container>
  );
};

export default Home;
const lgheaderLabels: string[] = ["Title", "Description", "Due Date", "Status"];
const lgdataKeys: (keyof Task)[] = [
  "title",
  "description",
  "dueDate",
  "status"
];

const smheaderLabels: string[] = ["Title", "Due Date", "Status"];
const smdataKeys: (keyof Task)[] = ["title", "dueDate", "status"];
