import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import { IProduct } from "../../types/product";
import ProductForm from "../../sections/products/ProductForm";
import ScraperForm from "../../sections/products/ScraperForm";
import axios from "axios";
import { FIND_PRODUCT_BY_ID, UPDATE_PRODUCT } from "../../graphql/product";
import Home from "@mui/icons-material/Home";
import { toast } from "sonner";

const ProductEditPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState<IProduct | null>(null);

  const handleScraper = async (productData: IProduct) => {
    if (product) {
      const updatedProduct = {
        ...product,
        mrp: productData.mrp,
        dealPrice: productData.dealPrice,
      };

      setProduct(updatedProduct);
    }
  };

  const FetchProduct = useCallback(async () => {
    try {
      const AUTH_TOKEN =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2EwNjc3ODQyNmQ4YTYxZmVhMGU5MzAiLCJlbWFpbCI6ImludGVybnNAbWljcm9mb3guY28iLCJpYXQiOjE3MzkxNjQ3ODMsImV4cCI6MTc0MTc1Njc4M30.w3Noq69dqXl3t2sbAfNDueQFr7IT85lXh0ln4LVM6TY";
      const res = await axios.post(
        "https://test-api.nine.deals/graphql",
        {
          query: FIND_PRODUCT_BY_ID,
          variables: { id },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        }
      );

      const data = await res.data;
      const fetchedProduct = data.data.findProductById;
      setProduct(fetchedProduct);
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  const handleSubmit = async (data: IProduct) => {
    const AUTH_TOKEN =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2EwNjc3ODQyNmQ4YTYxZmVhMGU5MzAiLCJlbWFpbCI6ImludGVybnNAbWljcm9mb3guY28iLCJpYXQiOjE3MzkxNjQ3ODMsImV4cCI6MTc0MTc1Njc4M30.w3Noq69dqXl3t2sbAfNDueQFr7IT85lXh0ln4LVM6TY";
    const input = {
      title: data.title,
      description: data.description,
      brandId: data.brandId,
      categoryId: data.categoryId,
      mrp: data.mrp,
      dealPrice: data.dealPrice,
      listPrice: data.listPrice,
      code: data.code,
      images: data.images,
      storeId: data.storeId,
      expired: data.expired,
      active: data.active,
      rating: data.rating,
      reviews: data.reviews,
      handPicked: data.handPicked,
      sales: data.sales,
    };
    try {
      const res = await axios.post(
        "https://test-api.nine.deals/graphql",
        {
          query: UPDATE_PRODUCT,
          variables: {
            id,
            input,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        }
      );
      setProduct(res.data.updateProduct);
      console.log(res);
      toast.success("Product updated successfully");
      navigate("/products");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    FetchProduct();
  }, [FetchProduct]);

  console.log(product);
  return (
    <Box>
      <Breadcrumbs separator="›">
        <Link
          href="/login"
          sx={{ color: "text.secondary", textDecoration: "none" }}
        >
          <Home />
        </Link>
        <Link
          href="/products"
          sx={{ color: "text.secondary", textDecoration: "none" }}
        >
          Products
        </Link>
        <Typography>Add Product</Typography>
      </Breadcrumbs>
      <Stack spacing={3}>
        <ScraperForm onSubmit={handleScraper} code={product?.code} />
        {product && (
          <ProductForm
            isEdit
            onSubmit={handleSubmit}
            product={product}
            loading
          />
        )}
      </Stack>
    </Box>
  );
};

export default ProductEditPage;
