import { useState, useEffect } from "react";
import type { FieldError } from "react-hook-form";

import {
  Box,
  Card,
  List,
  Stack,
  ListItem,
  Typography,
  IconButton,
  CardContent,
  Link as MuiLink,
} from "@mui/material";

import SaleAutocompleteDialog from "../sales/SaleAutocompleteDialog";
import { useCustomAlert } from "../../context/custom-alert-context";
import { ISale } from "../../types/sale";
import Iconify from "../../iconify";

type Props = {
  sales: string[];
  error?: FieldError;
  onSaleSubmit: (sales: string[]) => void;
};

const ProductSalesList = ({
  sales: productSales,
  error,
  onSaleSubmit,
}: Props) => {
  const [sales, setSales] = useState<string[]>([]);
  const { customAlert } = useCustomAlert();

  const handleSaleSubmit = (sale: ISale | null) => {
    if (sale) {
      if (sales.includes(sale.slug)) return;
      const updatedSales = [...sales, sale.slug];
      setSales(updatedSales);
      onSaleSubmit(updatedSales);
    }
  };

  const handleDelete = (s: string) => {
    const newItems = sales.filter((item) => item !== s);
    setSales(newItems);
    onSaleSubmit(newItems);
  };

  const handleDeleteConfirmation = (s: string) => {
    customAlert("Confirm Deletion", {
      description: `Deleting ${s} will remove it from the sales list.`,
      variant: "delete",
      onConfirm: () => handleDelete(s),
    });
  };

  useEffect(() => {
    setSales(productSales);
  }, [productSales]);

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ pb: 2 }}
          >
            <Typography variant="h5">Product in Sales</Typography>
            <SaleAutocompleteDialog
              error={error}
              handleSelectedSale={handleSaleSubmit}
            />
          </Stack>
          {sales.length > 0 ? (
            <List
              sx={{
                border: "0.5px solid",
                borderRadius: 2,
                borderColor: "#80808066",
                px: 2,
              }}
            >
              {sales.map((s, index) => (
                <Stack
                  key={s}
                  direction="row"
                  sx={{
                    borderTop: index > 0 ? "0.5px solid" : undefined,
                    borderColor: "#80808066",
                    py: 0.5,
                  }}
                >
                  <ListItem sx={{ width: "100%" }}>
                    <Typography
                      variant="body1"
                      component={MuiLink}
                      href={`/sales/${s}/edit`}
                      color="inherit"
                      sx={{
                        textDecoration: "none",
                        textTransform: "capitalize",
                      }}
                    >{`${index + 1}. ${s.replace(/-/g, " ")}`}</Typography>
                  </ListItem>

                  <IconButton
                    onClick={() => handleDeleteConfirmation(s)}
                    size="small"
                    sx={{ ml: 1 }}
                  >
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Stack>
              ))}

              <Box />
            </List>
          ) : (
            <Typography sx={{ opacity: 0.3 }}>No Sales Found</Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductSalesList;
