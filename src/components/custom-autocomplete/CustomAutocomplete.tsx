import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { FieldError } from "react-hook-form";
import { FETCH_BRANDS } from "../../graphql/brand";
import { FETCH_CATEGORIES } from "../../graphql/category";
import { FETCH_STORES } from "../../graphql/store";
import { FETCH_SALES } from "../../graphql/sale";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import Iconify from "../../iconify";
import axios from "axios";
import { getLabelFromPath } from "../../utils/common";

export type IAutocompleteFields = {
  id: string;
  title: string;
  active: boolean;
  path?: string;
};

type Label =
  | "Brand"
  | "Category"
  | "Parent Category"
  | "old Parent"
  | "New Parent"
  | "Store"
  | "Product"
  | "Sale"
  | "Post";

type Props<T> = {
  error: FieldError | undefined;
  selectedFilter: T | null;
  handleSelectedFilter: (value: T) => void;
  disabled?: boolean;
  showAddButton?: boolean;
  label: Label | string;
};

const getQueryVariables = (label: Label | string) => {
  switch (label) {
    case "Brand":
      return {
        linkType: "brands",
        queryName: "findBrands",
        query: FETCH_BRANDS,
      };
    case "Category":
    case "Parent Category":
    case "Old Parent":
    case "New Parent":
      return {
        linkType: "categories",
        queryName: "findCategories",
        query: FETCH_CATEGORIES,
      };
    case "Store":
      return {
        linkType: "stores",
        queryName: "findStores",
        query: FETCH_STORES,
      };
    case "Sale":
      return {
        linkType: "sales",
        queryName: "findSales",
        query: FETCH_SALES,
      };

    default:
      return {
        linkType: "",
        queryName: "",
        query: ``,
      };
  }
};

const CustomAutocomplete = <T extends IAutocompleteFields>(props: Props<T>) => {
  const {
    error,
    selectedFilter,
    handleSelectedFilter,
    disabled,
    showAddButton,
    label,
  } = props;

  const [options, setOptions] = useState<T[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm);

  const query = getQueryVariables(label).query;
  const queryName = getQueryVariables(label).queryName;
  const linkType = getQueryVariables(label).linkType;

  const fetchFilters = useCallback(async () => {
    if (!debouncedSearchTerm) return;

    setIsLoading(true);
    const AUTH_TOKEN =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2EwNjc3ODQyNmQ4YTYxZmVhMGU5MzAiLCJlbWFpbCI6ImludGVybnNAbWljcm9mb3guY28iLCJpYXQiOjE3NDA4MTQ0NzksImV4cCI6MTc0MzQwNjQ3OX0.5SXpeVP9I9N3YZR63OAWz004yFDiQ74xyGcbDho6Tak";

    try {
      const response = await axios.post(
        "https://test-api.nine.deals/graphql",
        {
          query: query,
          variables: { search: { title: debouncedSearchTerm } },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        }
      );
      const options =
        response.data?.data?.[queryName][
          label === "Sale" ? "results" : linkType
        ] || [];
      setOptions(options);
      setIsLoading(false);
    } catch (err) {
      toast.error(`Error in fetching ${err}`);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchTerm, query, queryName, label, linkType]);

  const handleAutoCompleteOnChange = (newValue: T) => {
    if (newValue) {
      // console.log(newValue);
      console.log("Autocomplete Value Selected:", newValue);
      handleSelectedFilter(newValue);
      if (!newValue.active) {
        toast.error(`${label} is inactive. Please make it active.`);
      }
    } else {
      handleSelectedFilter(null as unknown as T);
    }
    setOpen(false);

    // if (!newValue) {
    //   setOptions([]);
    // }
  };

  const handleTextFieldOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    if (!value) {
      setIsLoading(false);
      setOpen(false);
    } else {
      setIsLoading(true);
      setOpen(true);
    }
    setOptions([]);
  };

  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  console.log("selected", selectedFilter);

  useEffect(() => {
    if (selectedFilter && selectedFilter.id) {
      setOptions([selectedFilter]);
    }
  }, [selectedFilter]);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  return (
    <Box sx={{ position: "relative", height: showAddButton ? 80 : "auto" }}>
      <Autocomplete
        options={options}
        value={selectedFilter}
        open={open}
        getOptionLabel={(option) =>
          `${
            label === "Category"
              ? getLabelFromPath(option.path ?? "")
              : option.title
          }`
        }
        isOptionEqualToValue={(option, value) => option.id === value?.id}
        onChange={(_event, newValue) =>
          handleAutoCompleteOnChange(newValue as T)
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder="Type to search..."
            error={!!error}
            onFocus={handleOnFocus}
            onBlur={() => setOpen(false)}
            onChange={handleTextFieldOnChange}
            helperText={error ? error.message : ""}
          />
        )}
        loading={isLoading}
        noOptionsText={`No ${linkType} found...`}
        clearOnBlur={false}
        disabled={disabled}
      />
      {showAddButton && (
        <Button
          variant="text"
          size="small"
          startIcon={
            <Iconify
              icon={selectedFilter ? `eva:edit-fill` : `mingcute:add-fill`}
              width={16}
            />
          }
          component={Link}
          to={
            selectedFilter
              ? `/${linkType}/${selectedFilter.id}/edit`
              : `/${linkType}/new`
          }
          target="_blank"
          sx={{ position: "absolute", right: 0, bottom: -8 }}
        >
          {selectedFilter ? "Edit" : "Add"} {label}
        </Button>
      )}
    </Box>
  );
};

export default CustomAutocomplete;
