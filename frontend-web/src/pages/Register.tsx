import { userApi } from "@apis/user";
import { AuthFormController } from "@components/common-ui/AuthFormController";
import routePath from "@config/paths";
import { Card, Container, Stack, Typography, Link as MuiLink } from "@mui/material";
import { dialogStore } from "@store/DialogStore";
import { User } from "@utils/types";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (user: User) => {
    dialogStore.open({
      title: "Create Account",
      subtitle: "Click continue to create your account now.",
      rightButton: {
        onClick: () => makeApiCall(user),
        label: "Continue",
      },
      open: true,
    });
  };

  const makeApiCall = async (user: User) => {
    try {
      const res = await userApi.createUser(user);
      dialogStore.open({
        title: "Registration",
        subtitle: res.message ?? "Request successful",
        rightButton: {
          onClick: () => dialogStore.close(),
          label: "Okay",
        },
        open: true,
      });
    } catch (err) {
      dialogStore.open({
        title: "Error",
        subtitle: "Failed to create account. Please try again.",
        rightButton: {
          onClick: () => dialogStore.close(),
          label: "Close",
        },
        open: true,
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Stack direction="column" justifyContent="center" height="100vh" spacing={2}>
        <Card variant="outlined" sx={{ padding: 5 }}>
          <AuthFormController onSubmit={handleSubmit} type="Register" />
        </Card>
        <Typography textAlign="center" variant="body2">
        have an account?{" "}
          <MuiLink component="button" onClick={() => navigate(routePath.LOGIN_FORM_PAGE)} underline="hover">
            Login now
          </MuiLink>
        </Typography>
      </Stack>
    </Container>
  );
};

export default RegistrationPage;
