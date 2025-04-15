import type { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";

import type { FormControlLabelProps } from "@mui/material";
import { Switch, FormHelperText, FormControlLabel } from "@mui/material";

type Props = Omit<FormControlLabelProps, "control"> & {
  name: string;
  helperText?: ReactNode;
};

const RHFSwitch = (props: Props) => {
  const { control } = useFormContext();
  const { name, helperText, ...other } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <FormControlLabel
            control={<Switch {...field} checked={field.value} />}
            {...other}
          />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
};

export default RHFSwitch;
