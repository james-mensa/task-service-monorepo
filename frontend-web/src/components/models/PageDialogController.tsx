import { observer } from "mobx-react-lite";
import { dialogStore } from "../../store/DialogStore";
import { PromptDialog } from "./PromptDialog";

const PageDialogController = observer(() => {
  const {
    isOpen,
    isProcessing,
    props,
    close
  } = dialogStore;


  const handleRightPress = async () => {
    dialogStore.startProcessing();
    await props.rightButton?.onClick();
    dialogStore.stopProcessing();
  };

  const handleLeftPress = () => {
    props.leftButton?.onClick();
    close();
  };

  return (
      <PromptDialog
      open={isOpen}
      isProcessing={isProcessing}
      title={props.title}
      subtitle={props.subtitle}
      leftButton={
       { label:props.leftButton?.label,
        onClick:handleLeftPress}}
      rightButton={{ 
        label:props.rightButton?.label,
        onClick:handleRightPress}}
      />
  );
});

export default PageDialogController;