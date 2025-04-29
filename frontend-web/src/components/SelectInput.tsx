import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SelectChangeEvent } from "@mui/material";
import { SelectOption } from "@utils/types";

interface SelectInputProps {
  label: string;
  placeholder: string;
  name?: string;
  onChange?:(event: SelectChangeEvent<string>) => void,
  value?: string;
  error?: boolean;
  options: SelectOption[],
}

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  placeholder,
  name,
  onChange,
  value,
  error,
  options
}) => {
    const isAvailable = options.find((item) => item.value === value);
    const renderValue = (value: any) => {
        if (!value) {
          return <Typography color={grey[500]}>{placeholder}</Typography>;
        }
        if (isAvailable) return isAvailable ? value : "";
      };
    const inputValue = isAvailable ? value : "";
    return (
       <Stack width={"100%"} height={60} gap={0.3}>
         
         {label && <Typography
            fontFamily={"Inter"}
            fontWeight={500}
            fontSize={14}
            color={grey[700]}
          >
            {label}
          </Typography>}
    
          <FormControl>
            <Select
              name={name}
              value={inputValue}
              onChange={onChange}
              defaultValue=""
      
              displayEmpty
              renderValue={renderValue}
              sx={styles.inputProps}
            >
              {options.map((data, index) => (
                <MenuItem value={data.value} key={`${index}`}>
                  <Typography
                    fontFamily={"Inter"}
                    fontWeight={400}
                    fontSize={16}
                    color={"#667085"}
                  >
                    {data.label}
                  </Typography>
                </MenuItem>
              ))}
            </Select>

          </FormControl>
        </Stack>
      );
};

const styles = {
  inputProps: {
    borderRadius: "8px",
    borderColor: grey[500],

    "& .MuiSelect-select": {
      borderRadius: "8px",
      color: "#667085",
      backgroundColor: "white",

      "&:focus": {
        borderRadius: "8px",
        borderColor: grey[500],
      },

      "&:hover": {
        borderRadius: "8px",
        borderColor: grey[500],
      },

      "&:active": {
        borderRadius: "8px",
        borderColor: grey[500],
      },
      borderColor: grey[500],
    },

    "&.Mui-focused fieldset": {
        borderColor: grey[500],
      borderRadius: "8px",
    },
    "&:hover fieldset": {
      borderColor: grey[500],
      borderRadius: "8px",
    },
  },
};
