import { Controller, useFormContext } from "react-hook-form";
import type { TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";

type Props = TextFieldProps & {
  name: string;
};

const RHFTextField = (props: Props) => {
  const { control, register } = useFormContext();

  const { name, helperText, type = "text", ...other } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={field.value}
          type={type}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...register(name)}
          {...other}
        />
      )}
    />
  );
};

export default RHFTextField;
