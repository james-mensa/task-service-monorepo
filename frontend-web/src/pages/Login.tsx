import { userApi } from "@apis/user";
import { AuthFormController } from "@components/common-ui/AuthFormController";
import { appConfig } from "@config/config";
import routePath from "@config/paths";
import {
  Card,
  Container,
  Stack,
  Typography,
  Link as MuiLink
} from "@mui/material";
import { dialogStore } from "@store/DialogStore";
import LocalStorageService from "@store/LocalStorage";
import { User } from "@utils/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const jwt_token = LocalStorageService.getItem(appConfig.auth_token);
    if (jwt_token !== null || jwt_token !== undefined) {
      navigate(routePath.HOME_PATH);
    }
  }, []);

  const handleSubmit = (user: User) => {
    dialogStore.open({
      title: "Login",
      subtitle: "Click continue login now.",
      rightButton: {
        onClick: () => makeApiCall(user),
        label: "Continue"
      },
      open: true
    });
  };

  const makeApiCall = async (user: User) => {
    try {
      const res = await userApi.login(user);
      dialogStore.open({
        title: "Login",
        subtitle: res.message ?? "Request successful",
        rightButton: {
          onClick: () => dialogStore.close(),
          label: "Okay"
        },
        open: true
      });
      setTimeout(()=>{
        navigate('Home')

      },1000)
    } catch (err) {
      dialogStore.open({
        title: "Error",
        subtitle: "Failed to login account. Please try again.",
        rightButton: {
          onClick: () => dialogStore.close(),
          label: "Close"
        },
        open: true
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Stack
        direction="column"
        justifyContent="center"
        height="100vh"
        spacing={2}
      >
        <Card variant="outlined" sx={{ padding: 5 }}>
          <AuthFormController onSubmit={handleSubmit} type="Login" />
        </Card>
        <Typography textAlign="center" variant="body2">
          Don&apos;t have an account?{" "}
          <MuiLink
            component="button"
            onClick={() => navigate(routePath.REGISTER_FORM_PAGE)}
            underline="hover"
          >
            Register now
          </MuiLink>
        </Typography>
      </Stack>
    </Container>
  );
};

export default LoginPage;
