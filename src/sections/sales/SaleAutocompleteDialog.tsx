import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import { useState } from "react";
import Iconify from "../../iconify";
import CustomAutocomplete from "../../components/custom-autocomplete/CustomAutocomplete";
import { FieldError } from "react-hook-form";
import { ISale } from "../../types/sale";

type Props = {
  error?: FieldError;
  handleSelectedSale: (sale: ISale | null) => void;
};

const SaleAutocompleteDialog = ({ error, handleSelectedSale }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<ISale | null>(null);

  const handleSubmit = () => {
    handleSelectedSale(selectedValue);
    setOpen(false);
  };

  const handleClose = () => {
    setSelectedValue(null);
    setOpen(false);
  };
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        + sale
      </Button>
      {open && (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>Add Product to Sale</Box>
              <IconButton onClick={handleClose}>
                <Iconify icon="mdi:close" width={24} />
              </IconButton>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={1} sx={{ pt: 1 }}>
              {open && (
                <CustomAutocomplete
                  label="Sale"
                  selectedFilter={selectedValue}
                  handleSelectedFilter={setSelectedValue}
                  error={error}
                />
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default SaleAutocompleteDialog;
