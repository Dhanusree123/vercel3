import { Autocomplete, TextField } from "@mui/material";

type OptionType = {
  code: string;
  name: string;
};

type AutocompleteProps = {
  value: OptionType | null;
  onChange: (value: OptionType | null) => void;
  options: OptionType[];
  label: string;
};

const RHFAutocomplete = ({
  value,
  onChange,
  options,
  label,
}: AutocompleteProps) => {
  return (
    <Autocomplete
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      options={options}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default RHFAutocomplete;
