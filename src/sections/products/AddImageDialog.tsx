import { z } from "zod";
import { useState } from "react";

import {
  Stack,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { CommonSlideProps } from "../../types/global";

type Props = {
  open: boolean;
  onSubmit: (imageUrl: string) => void;
  onClose: VoidFunction;
  selectedImage: CommonSlideProps | null;
};

const AddImageDialog = (props: Props) => {
  const { open, onClose, onSubmit, selectedImage } = props;

  const [imageUrl, setImageUrl] = useState(selectedImage?.thumbnailUrl || "");
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setImageUrl(value);
    setError("");
  };

  const handleSubmit = () => {
    const isValid = z.string().url().safeParse(imageUrl).success;
    if (!isValid) {
      setError("Invalid URL");
      return;
    }
    setError("");
    onSubmit(imageUrl);
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Add Image</DialogTitle>
      <DialogContent>
        <Stack spacing={1} sx={{ pt: 1 }}>
          <TextField
            label="Image URL"
            value={imageUrl}
            onChange={handleChange}
            helperText={error ?? ""}
            error={Boolean(error)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" size="small">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddImageDialog;
