import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Stack,
  Switch,
} from "@mui/material";
import RHFTextField from "../../components/RHFTextField";
import { IComponent } from "../../types/page-layout";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { Close } from "@mui/icons-material";
import FormProvider from "../../components/FormProvider";
import { nanoid } from "nanoid";

type Props = {
  isEdit?: boolean;
  open: boolean;
  onClose: () => void;
  componentData?: IComponent | null;
  handleComponent: (data: IComponent) => void;
};

const AddComponentDialogForm = (props: Props) => {
  const {
    isEdit = false,
    handleComponent,
    componentData,
    open,
    onClose,
  } = props;

  const defaultValues = useMemo(
    () => ({
      id: componentData?.id || "",
      title: componentData?.title || "",
      active: componentData?.active || false,
    }),
    [componentData]
  );

  const methods = useForm<IComponent>({
    defaultValues,
    mode: "onChange",
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = (data: IComponent) => {
    const newComponent = {
      ...data,
      id: data.id || nanoid(),
    };
    handleComponent(newComponent);
  };

  useEffect(() => {
    if (open && componentData) {
      reset(componentData);
    } else if (!open) {
      reset(defaultValues);
    }
  }, [open, reset, defaultValues, componentData]);

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {isEdit ? "Edit" : "Add"} Component
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              {isEdit && (
                <RHFTextField
                  name="id"
                  label="Id"
                  helperText={errors.id && errors.id.message}
                  disabled
                />
              )}
              <RHFTextField
                name="title"
                label="Component Title"
                helperText={errors.title && errors.title.message}
              />
              <Controller
                name="active"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <FormControlLabel
                      control={<Switch {...field} checked={field.value} />}
                      label="Active"
                    />
                    {error && (
                      <FormHelperText error>{error?.message}</FormHelperText>
                    )}
                  </>
                )}
              />
              <DialogActions sx={{ px: 0 }}>
                <Button type="submit" variant="contained">
                  {isEdit ? "Update" : "Add"}
                </Button>
              </DialogActions>
            </Stack>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddComponentDialogForm;
