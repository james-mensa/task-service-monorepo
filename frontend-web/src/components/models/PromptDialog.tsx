import { BaseModal } from "../BaseModel";
import { Card, Typography,Stack, Theme } from "@mui/material";
import { grey } from "@mui/material/colors";
import {PromptDialogProps} from '../../utils/types'
import { AppButton } from "../Button";

export const PromptDialog: React.FC<PromptDialogProps> = ({
  title,
  subtitle,
  leftButton,
  rightButton,
  open,
  isProcessing
}) => {
  return (
    <BaseModal isOpen={open} handleClose={leftButton?.onClick}>
      <Card sx={styles.card}>
        <Stack direction={'column'} justifyContent={'space-between'} height={150}>
        <Stack>
        <Typography variant="h6" fontWeight={700} color={grey[700]}>
        {title}
        </Typography>
        <Typography  fontWeight={500} color={grey[700]} fontSize={14}>
         {subtitle}
        </Typography>
        </Stack>

         <Stack direction={"row"}
          spacing={1} top={5} width={'100%'}
          justifyContent={'right'} alignItems={'center'}>
                    <AppButton
                      type="Secondary"
                      onClick={leftButton?.onClick}
                      label={leftButton?.label??'Cancel'}
                    />
                    <AppButton
                      onClick={rightButton?.onClick}
                      label={rightButton?.label??'Continue'}
                      loading={isProcessing}
                    />
                  </Stack>

        </Stack>
 
 
      </Card>
    </BaseModal>
  );
};

const styles = {
  card:(theme:Theme)=>({
    padding:2,
    [theme.breakpoints.up("md")]: {
      width: 400,
    },
    [theme.breakpoints.up("xl")]: {
      width: "40%",
    },
  })
};
