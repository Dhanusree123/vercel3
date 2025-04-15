import {
  Dialog,
  Button,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { ICustomAlertOptions } from "../../types/custom-alert";

type Props = ICustomAlertOptions & {
  open: boolean;
  title: string;
  onClose: () => void;
};

const CustomAlert = (props: Props) => {
  const {
    open,
    title,
    description,
    variant = "primary",
    onConfirm,
    onClose,
  } = props;

  if (!open) {
    return null;
  }

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const getText = () => {
    switch (variant) {
      case "delete":
        return {
          title: title ?? "Are you sure you want to delete?",
          confirmButtonText: "Delete",
          variant: "error",
        };
      case "save":
        return {
          title: title ?? "Are you sure you want to save?",
          confirmButtonText: "Save",
          variant: "success",
        };
      default:
        return {
          title: title ?? "Are you sure?",
          confirmButtonText: "Confirm",
          variant: "primary",
        };
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{getText().title}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={onClose}>
          {onConfirm ? "Cancel" : "Close"}
        </Button>
        {onConfirm && (
          <Button
            onClick={handleConfirm}
            variant="contained"
            color={getText().variant as "primary" | "error" | "success"}
          >
            {getText().confirmButtonText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomAlert;
