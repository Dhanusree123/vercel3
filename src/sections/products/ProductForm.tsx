import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useEffect, useCallback, useState } from "react";

import Grid from "@mui/material/Grid2";
import {
  Box,
  Card,
  Stack,
  Typography,
  CardContent,
  Button,
} from "@mui/material";

import {
  IProduct,
  NewProductSchema,
  // ProductSchema,
  UpdateProductSchema,
} from "../../types/product";
import RHFTextField from "../../components/hook-form/rhf-text-field";
import RHFSwitch from "../../components/hook-form/rhf-switch";
import { generateSlug } from "../../utils/common";
import FormProvider from "../../components/hook-form/form-provider";
import ProductPreview from "./ProductPreview";
import ProductSalesList from "./ProductSalesList";
import CustomAutocomplete from "../../components/custom-autocomplete/CustomAutocomplete";
import PriceHistory from "./PriceHistory";

type Props = {
  onSubmit: (data: IProduct) => void;
  isEdit?: boolean;
  product: IProduct | null;
  loading: boolean;
};

type IFields = {
  id: string;
  title: string;
  path?: string;
  active: boolean;
};

type ISelected = {
  brand: IFields | null;
  category: (IFields & { path: string }) | null;
  store: IFields | null;
};

const ProductForm = (props: Props) => {
  const { onSubmit, isEdit = false, product, loading } = props;

  const [selected, setSelected] = useState<ISelected>({
    brand: null,
    category: null,
    store: null,
  });

  const productSchema = isEdit ? UpdateProductSchema : NewProductSchema;

  const defaultValues = useMemo(
    () => ({
      id: product?.id ?? "",
      title: product?.title ?? "",
      description: product?.description ?? "",
      brandId: product?.brandId ?? "",
      store: product?.store ?? "",
      brand: product?.brand ?? "",
      categoryId: product?.categoryId ?? "",
      categoryPath: product?.categoryPath ?? "",
      storeId: product?.storeId ?? "",
      mrp: product?.mrp ?? 0,
      dealPrice: product?.dealPrice ?? 0,
      listPrice: product?.listPrice ?? 0,
      rating: product?.rating ?? 0,
      reviews: product?.reviews ?? 0,
      code: product?.code ?? "",
      images: product?.images ?? [],
      active: product?.active ?? true,
      handPicked: product?.handPicked ?? false,
      expired: product?.expired ?? false,
      slug: product?.slug ?? "",
      sales: product?.sales ?? [],
      priceHistory: [
        {
          mrp: product?.mrp ?? 0,
          listPrice: product?.listPrice ?? 0,
          dealPrice: product?.dealPrice ?? 0,
          date: new Date().toISOString(),
        },
      ],
    }),
    [product]
  );

  const methods = useForm<IProduct>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = methods;

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue("title", value);
    setValue("slug", generateSlug(value));
  };

  const titleValue = watch("title");
  useEffect(() => {
    if (titleValue) {
      setValue("slug", generateSlug(titleValue), { shouldValidate: true });
    }
  }, [setValue, titleValue]);

  const title = watch("title");
  const mrp = watch("mrp");
  const dealPrice = watch("dealPrice");
  const images = watch("images");
  const listPrice = watch("listPrice");

  const setFormValue = useCallback(
    (field: keyof IProduct, value: string) => {
      setValue(field, value, { shouldValidate: true });
    },
    [setValue]
  );

  const handleSelected = useCallback(
    <T extends keyof ISelected>(key: T, value: ISelected[T]) => {
      console.log("console", key, value);

      setSelected((prev) => ({
        ...prev,
        [key]: value,
      }));

      switch (key) {
        case "brand":
          setFormValue("brandId", value?.id ?? "");
          break;
        case "category":
          setFormValue("categoryId", value?.id ?? "");
          setFormValue("categoryPath", value?.path ?? "");
          break;
        case "store":
          setFormValue("storeId", value?.id ?? "");
          break;
        default:
          break;
      }
    },
    [setFormValue]
  );

  useEffect(() => {
    reset({
      ...defaultValues,
    });
  }, [defaultValues, reset]);

  // useEffect(() => {
  //   if (product) {
  //     setSelected({
  //       brand: product.brand ?? null,
  //       category: product.category ?? null,
  //       store: product.store ?? null,
  //     });
  //   }
  // }, [product]);

  useEffect(() => {
    console.log("Updated selected state:", selected);
  }, [selected]);

  console.log(selected);

  return (
    <Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }} order={{ xs: 2, md: 1, l: 1, xl: 1 }}>
            <Stack spacing={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3 }}>
                    {isEdit ? "Edit" : "Add"} Product
                  </Typography>
                  <Stack spacing={2}>
                    {isEdit && <RHFTextField name="id" label="ID" disabled />}
                    <RHFTextField
                      name="title"
                      label="Title"
                      placeholder="Title"
                      helperText={errors.title && errors.title.message}
                      onChange={handleTitleChange}
                    />
                    <RHFTextField
                      name="slug"
                      label="Slug"
                      placeholder="slug"
                      helperText={errors.slug && errors.slug.message}
                      disabled
                    />
                    <RHFTextField
                      name="description"
                      placeholder="Description"
                      label="Description"
                      multiline
                      rows={4}
                      helperText={
                        errors.description && errors.description.message
                      }
                    />
                    <RHFTextField
                      name="mrp"
                      label="MRP"
                      placeholder="MRP"
                      helperText={errors.mrp && errors.mrp.message}
                    />
                    <RHFTextField
                      name="listPrice"
                      label="List Price"
                      placeholder="List Price"
                      helperText={errors.listPrice && errors.listPrice.message}
                    />
                    <RHFTextField
                      name="dealPrice"
                      placeholder="Deal Price"
                      label="Deal Price"
                    />
                    <RHFTextField
                      name="code"
                      label="Code"
                      placeholder="Code"
                      helperText={errors.code && errors.code.message}
                      disabled={isEdit}
                    />

                    <CustomAutocomplete
                      label="Brand"
                      selectedFilter={selected.brand}
                      handleSelectedFilter={(value) =>
                        handleSelected("brand", value)
                      }
                      error={errors.brandId}
                      showAddButton
                    />

                    <CustomAutocomplete
                      label="Category"
                      selectedFilter={selected.category}
                      handleSelectedFilter={(value) =>
                        handleSelected("category", value)
                      }
                      error={errors.categoryId}
                      showAddButton
                    />

                    {isEdit && (
                      <RHFTextField
                        name="categoryPath"
                        label="Category Path"
                        placeholder="Category Path"
                        helperText={
                          errors.categoryPath && errors.categoryPath.message
                        }
                        disabled={true}
                      />
                    )}

                    <CustomAutocomplete
                      label="Store"
                      selectedFilter={selected.store}
                      handleSelectedFilter={(value) =>
                        handleSelected("store", value)
                      }
                      error={errors.storeId}
                      showAddButton
                    />

                    <RHFTextField
                      name="rating"
                      label="Rating"
                      placeholder="Rating"
                      helperText={errors.rating && errors.rating.message}
                    />
                    <RHFTextField
                      name="reviews"
                      label="Reviews"
                      placeholder="Reviews"
                      helperText={errors.reviews && errors.reviews.message}
                    />
                    <Stack direction="row" alignItems="center">
                      <RHFSwitch
                        name="handPicked"
                        label="HandPicked"
                        sx={{ ml: "auto" }}
                      />
                    </Stack>
                    {isEdit && (
                      <Stack direction="row" justifyContent="space-between">
                        <RHFSwitch name="active" label="Active" />
                        <RHFSwitch name="expired" label="Expired" />
                      </Stack>
                    )}
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 2, l: 2, xl: 2 }}>
            <ProductPreview
              title={title}
              images={images}
              dealPrice={dealPrice}
              mrp={mrp}
              listPrice={listPrice}
              loading={loading}
            />
            <ProductSalesList
              sales={product?.sales || []}
              onSaleSubmit={(sales) => setValue("sales", sales)}
            />
          </Grid>
        </Grid>
      </FormProvider>
      {isEdit && (
        <Box sx={{ mt: 3 }}>
          <PriceHistory data={product?.priceHistory || []} />
        </Box>
      )}
    </Box>
  );
};

export default ProductForm;
