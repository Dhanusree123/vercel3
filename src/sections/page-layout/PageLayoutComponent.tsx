import { useSortable } from "@dnd-kit/sortable";
import { IComponent } from "../../types/page-layout";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Delete, DragIndicator, Edit } from "@mui/icons-material";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  item: IComponent;
  isEdit: boolean;
  onDelete: (id: string) => void;
  onEdit: (item: IComponent) => void;
};

const PageLayoutComponent = (props: Props) => {
  const { item, onDelete, isEdit, onEdit } = props;
  const { id, title } = item;
  const safeId = id ? id : "";

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: safeId });

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleConfirmDelete = () => {
    onDelete(id);
    setOpenDeleteDialog(false);
    toast.success("Component deleted successfully");
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          transform: CSS.Transform.toString(transform),
          transition,
          border: "1px dashed black",
          borderRadius: 1,
          p: 1,
          position: "relative",
          cursor: isDragging ? "grabbing" : "default",
        }}
        ref={setNodeRef}
      >
        <Box
          {...attributes}
          {...listeners}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pr: 1,
            cursor: "grab",
          }}
        >
          <DragIndicator fontSize="small" />
        </Box>
        <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
          <Typography
            variant="body2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              mr: 2,
            }}
          >
            {title}
          </Typography>
        </Box>

        <Box>
          {isEdit && (
            <IconButton onClick={() => onEdit(item)}>
              <Edit />
            </IconButton>
          )}

          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setOpenDeleteDialog(true);
            }}
          >
            <Delete />
          </IconButton>
        </Box>
      </Stack>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Component</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <strong>{title}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PageLayoutComponent;
