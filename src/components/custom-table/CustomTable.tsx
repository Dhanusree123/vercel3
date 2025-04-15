import {
  Box,
  Checkbox,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { ITableColumn } from "../../types/common";
import { useMemo } from "react";
import CustomImage from "../custom-image/CustomImage";
import {
  currencyFormatter,
  getObjectKeyValue,
  transformImageUrl,
} from "../../utils/common";

type Props = {
  columns: ITableColumn[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  page?: number;
  sortBy?: { key: string; order: "asc" | "desc" } | null;
  isLoading?: boolean;
  activeTab?: string;
  onTabChange?: (event: React.SyntheticEvent, newValue: string) => void;
  count?: number;
  tabs?: { key: string; label: string; value: string }[];
  onSort?: (key: string) => void;
  handleSelectedItems?: (items: string[]) => void;
  selectedItems?: string[];
  showCheckbox?: boolean;
  hideTabs?: boolean;
};

const CustomTable = ({
  columns,
  data,
  sortBy,
  page = 1,
  isLoading,
  activeTab,
  onTabChange,
  count,
  tabs = [],
  onSort = () => {},
  handleSelectedItems = () => {},
  selectedItems = [],
  showCheckbox = false,
  hideTabs = false,
}: Props) => {
  const ITEMS_PER_PAGE = 25;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;

  const selectedIds: Record<string, boolean> = useMemo(() => {
    return selectedItems?.reduce((acc, item) => ({ ...acc, [item]: true }), {});
  }, [selectedItems]);

  const handleSelect = (id: string) => {
    if (selectedIds[id]) {
      handleSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      handleSelectedItems([...selectedItems, id]);
    }
  };
  const handleSelectAll = (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    if (checked) {
      handleSelectedItems(data.map((item) => item.id));
    } else {
      handleSelectedItems([]);
    }
  };

  return (
    <Box>
      {!hideTabs && !!tabs.length && (
        <Stack direction="row" justifyContent="space-between">
          <Tabs
            value={activeTab}
            onChange={onTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ p: 2 }}
          >
            {tabs.map((tab) => {
              const label =
                activeTab === tab.value ? `${tab.label} (${count})` : tab.label;
              return <Tab key={tab.key} label={label} value={tab.value} />;
            })}
          </Tabs>
        </Stack>
      )}
      <TableContainer component={Paper}>
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100px"
          >
            No Data
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                {showCheckbox ? (
                  <TableCell>
                    <Checkbox
                      size="small"
                      checked={selectedItems.length === data.length}
                      indeterminate={
                        selectedItems.length > 0 &&
                        selectedItems.length < data.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                ) : (
                  <TableCell align="center">No.</TableCell>
                )}
                {columns.map((column) => {
                  const { align = "left" } = column;
                  return (
                    <TableCell
                      key={column.label}
                      align={align}
                      sx={{
                        minWidth: column?.minWidth ?? "auto",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {column.sortable ? (
                        <TableSortLabel
                          active={column.key === sortBy?.key}
                          direction={sortBy?.order === "desc" ? "desc" : "asc"}
                          onClick={() => onSort(column?.key || "")}
                        >
                          {column.label}
                        </TableSortLabel>
                      ) : (
                        column.label
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            {!count ? (
              <TableBody>
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={columns.length + 1}
                  ></TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {data.map((item, index) => {
                  const { id } = item;
                  const checked = !!selectedIds[id];
                  return (
                    <TableRow key={item.id}>
                      {showCheckbox ? (
                        <TableCell align="center">
                          <Checkbox
                            size="small"
                            checked={checked}
                            onChange={() => handleSelect(id)}
                          />
                        </TableCell>
                      ) : (
                        <TableCell align="center">
                          {startIndex + index + 1}
                        </TableCell>
                      )}
                      {columns.map((column) => {
                        const {
                          key,
                          label,
                          align = "left",
                          action,
                          currency,
                          image,
                          textTransform,
                          minWidth = "auto",
                        } = column;
                        const value = key ? getObjectKeyValue(item, key) : null;
                        return (
                          <TableCell
                            key={label}
                            sx={{
                              textTransform: textTransform ?? "none",
                              minWidth,
                            }}
                            align={align}
                          >
                            {key && currency
                              ? currencyFormatter.format(value as number)
                              : key && !image && value}
                            {key && image && (
                              <Stack>
                                <CustomImage
                                  src={transformImageUrl(item.landingImage, 64)}
                                  alt={item.title}
                                  sx={{
                                    width: 48,
                                    height: 48,
                                    objectFit: "contain",
                                    borderRadius: 0.75,
                                    minWidth: 48,
                                  }}
                                />
                                <Tooltip
                                  title={item.title}
                                  placement="top-start"
                                >
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      maxWidth: 250,
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {item.title}
                                  </Typography>
                                </Tooltip>
                              </Stack>
                            )}
                            {action && action(item)}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </Table>
        )}
      </TableContainer>
    </Box>
  );
};

export default CustomTable;
