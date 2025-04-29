import React from "react";
import TextField from "@mui/material/TextField";

import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

interface TextInputProps {
  label: string;
  placeholder: string;
  name?: string;
  errorMessage?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  error?: boolean;
   type?: React.HTMLInputTypeAttribute
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  name,
  onChange,
  value,
  error,
  errorMessage,
  type
}) => {
  return (
    <Stack width={"100%"} height={60} gap={0.3}>
      <Typography
        fontFamily={"Inter"}
        fontWeight={500}
        fontSize={14}
        color={grey[800]}
      >
        {label}
      </Typography>

      <TextField
        placeholder={placeholder}
        variant="outlined"
        fullWidth
        sx={styles.inputProps}
        name={name}
        onChange={onChange}
        value={value}
        type={type}
      />
      {error && (
        <Typography variant="caption" color={"red"} sx={{ marginLeft: 1 }}>
          {errorMessage}
        </Typography>
      )}
    </Stack>
  );
};

const styles = {
  inputProps: {
    "& .MuiOutlinedInput-root": {
      fontSize:'13px',
      "& fieldset": {
        borderColor: grey[400],
        borderRadius: "8px",
      },
      "&:hover fieldset": {
        borderColor: grey[400],
        borderRadius: "8px",
      },
      "&.Mui-focused fieldset": {
        borderColor: grey[400],
        borderRadius: "8px",
      },
    },
    "& .MuiInputBase-input": {
      color: grey[800],
    },
    "& .MuiInputBase-input::placeholder": {
      color: grey[600],
    },
  },
};
