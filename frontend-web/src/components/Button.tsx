import { CircularProgress, Typography } from "@mui/material";
import Button, { ButtonOwnProps } from "@mui/material/Button";
import { grey } from "@mui/material/colors";
type ButtonType='Primary' | 'Secondary'

interface ButtonProps {
  children?: React.ReactElement;
  onClick?: () => void;
  variant?: ButtonOwnProps["variant"];
  label?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  type?:ButtonType
}
export const AppButton: React.FC<ButtonProps> = ({
  children,
  variant,
  onClick,
  label,
  loading,
  icon,
  type='Primary'
}) => {
    const styles=getStyles(type)
  return (
    <Button
      sx={styles.btn}
      variant={variant}
      onClick={onClick}
      disabled={loading}
      startIcon={loading ? <CircularProgress color="inherit" size={15} /> : icon}
    >
      <Typography
        fontFamily={"Inter"}
        fontWeight={500}
        fontSize={13}
        color={grey[200]}
      >
        {label}
      </Typography>
      {children}
    </Button>
  );
};

const getStyles=(type:ButtonType) =>( {
  btn: {
    backgroundColor:type==='Primary'? grey[800]:grey[500],
    color: "white",
    '&:hover': {
        backgroundColor:grey[700],
        color: 'white',
    },
  },
})
