import { Box, Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Asset } from "@assets/registry";
import { TextInput } from "@components/TextInput";
import { useFormManager } from "@hooks/useForm";
import { AppButton } from "@components/Button";
import { dialogStore } from "@store/DialogStore";
import { User } from "@utils/types";
import { isValidEmail, passwordhasError } from "@utils/common";

interface FormProps {
  onSubmit: (user: User) => void;
  type: "Register" | "Login";
}
export const AuthFormController: React.FC<FormProps> = observer(({ type, onSubmit }) => {
  const {
    formState,
    handleFieldChange,
    getFormData,
    onFormSubmit,
    setSubmitAttempt
  } = useFormManager<User>({
    email: "",
    password: ""
  });

  const handleonSubmit = () => {
    const optional_fields: (keyof User)[] = [];

    if (type === "Login") {
      optional_fields.push("userName", "confirmPassword");
    }

    const { isValid, data } = onFormSubmit({
      excludeFields: optional_fields
    });
    if (!isValid) {
      dialogStore.open({
        title: "Form",
        subtitle: "Please fill all required fields ",
        rightButton: {
          onClick: () => {}
        },
        open: true
      });
    }

    if (!isValidEmail(data.email)) {
      dialogStore.open({
        title: "Invalid Email",
        subtitle: "Please enter a valid email address.",
        rightButton: { onClick: () => {} },
        open: true
      });
      return;
    }

    const password_validation = passwordhasError(data.password);
    if (password_validation !== null) {
      dialogStore.open({
        title: "Weak Password",
        subtitle: password_validation,
        rightButton: { onClick: () => {} },
        open: true
      });
      return;
    }

    if (type === "Register") {
      if (data.password !== data.confirmPassword) {
        dialogStore.open({
          title: "Form",
          subtitle: "Please Password mismatch",
          rightButton: {
            onClick: () => {}
          },
          open: true
        });
      } else {
        onSubmit(data);
      }
    }
    setSubmitAttempt();
  };

  return (
    <Stack spacing={5} direction={"column"}>
      <Box>
        <Stack>
          {type == "Register" && (
            <TextInput
              label="User Name"
              onChange={handleFieldChange("userName")}
              placeholder="Enter  "
              value={formState.userName}
            />
          )}

          <TextInput
            label="Email"
            onChange={handleFieldChange("email")}
            placeholder="Enter  user email"
            value={formState.email}
          />
          <TextInput
            label="Password"
            onChange={handleFieldChange("password")}
            placeholder="Enter password"
            value={formState.password}
          />
          {type == "Register" && (
            <TextInput
              label="Confirm Password"
              onChange={handleFieldChange("password")}
              placeholder="Enter password agin"
              value={formState.password}
            />
          )}
        </Stack>
      </Box>

      <Box top={5}>
        <AppButton
          onClick={handleonSubmit}
          label={type === "Login" ? "Login" : "Register"}
          icon={Asset.icon.Bolt}
        />
      </Box>
    </Stack>
  );
});
