import { Box, Stack, useTheme, IconButton } from "@mui/material";

import { useSortable } from "@dnd-kit/sortable";
import CustomImage from "../custom-image/CustomImage";
import Iconify from "../../iconify";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  id: string;
  thumbnail: string;
  handleDelete: (id: string) => void;
  handleEditItem: () => void;
  handleClick?: () => void;
};

const DndGridItem = (props: Props) => {
  const { id, thumbnail, handleDelete, handleEditItem, handleClick } = props;
  const theme = useTheme();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <Stack
      sx={{
        m: 1,
        width: 125,
        position: "relative",
        transform: CSS.Transform.toString(transform),
        transition,
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 1,
        touchAction: "none",
        flexShrink: 0,
      }}
      onClick={handleClick}
    >
      <Box
        component="span"
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        sx={{ position: "absolute", top: 0, left: 0, cursor: "grab", p: 1 }}
        onClick={handleEditItem}
      >
        <Iconify
          icon="icon-park-outline:drag"
          color={theme.palette.secondary.light}
        />
      </Box>
      <IconButton
        title="Edit Slide"
        sx={{ position: "absolute", bottom: 0, left: 0 }}
        onClick={handleEditItem}
      >
        <Iconify
          icon="material-symbols:edit-outline"
          color={theme.palette.secondary.light}
        />
      </IconButton>
      <IconButton
        title="Remove Slide"
        sx={{ position: "absolute", bottom: 0, right: 0 }}
        onClick={() => handleDelete(id)}
      >
        <Iconify
          icon="eva:trash-2-outline"
          color={theme.palette.secondary.light}
        />
      </IconButton>

      <CustomImage
        src={thumbnail}
        sx={{
          width: "100%",
          aspectRatio: "1 / 1",
          background: theme.palette.common.white,
          objectFit: "contain",
          borderRadius: 1,
        }}
      />
    </Stack>
  );
};

export default DndGridItem;
