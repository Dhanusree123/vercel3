import { TextField, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
type Props = TextFieldProps & {
  name: string;
  isAddress?: boolean;
};
const CustomTextField = (props: Props) => {
  const { control } = useFormContext();
  const {
    name,
    helperText,
    type = "text",
    isAddress = false,
    ...other
  } = props;
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            fullWidth
            margin="normal"
            type={type}
            value={field.value}
            error={!!error}
            helperText={error ? error?.message : helperText}
            multiline={isAddress}
            rows={isAddress ? 4 : undefined}
            {...other}
          />
        )}
      />
    </>
  );
};

export default CustomTextField;
