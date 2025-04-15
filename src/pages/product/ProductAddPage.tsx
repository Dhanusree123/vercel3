import { useState } from "react";
import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import { IProduct } from "../../types/product";
import Home from "@mui/icons-material/Home";
import ProductForm from "../../sections/products/ProductForm";
import ScraperForm from "../../sections/products/ScraperForm";
import { CREATE_PRODUCT } from "../../graphql/product";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ProductAddPage = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [response, setResponse] = useState<IProduct>();

  const navigate = useNavigate();

  const handleScraper = (productData: IProduct) => {
    setProduct(productData);
  };

  const handleSubmit = async (data: IProduct) => {
    const AUTH_TOKEN =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2EwNjc3ODQyNmQ4YTYxZmVhMGU5MzAiLCJlbWFpbCI6ImludGVybnNAbWljcm9mb3guY28iLCJpYXQiOjE3MzkxNjQ3ODMsImV4cCI6MTc0MTc1Njc4M30.w3Noq69dqXl3t2sbAfNDueQFr7IT85lXh0ln4LVM6TY";

    try {
      const {
        brandId,
        categoryId,
        code,
        dealPrice,
        description,
        handPicked,
        images,
        listPrice,
        mrp,
        rating,
        reviews,
        sales,
        slug,
        storeId,
        title,
      } = data;
      const res = await axios.post(
        "https://test-api.nine.deals/graphql",
        {
          query: CREATE_PRODUCT,

          variables: {
            input: {
              brandId: `${brandId}`,
              categoryId: `${categoryId}`,
              code: `${code}`,
              dealPrice: Number(dealPrice),
              description: `${description}`,
              handPicked: Boolean(handPicked),
              images: `${images}`,
              listPrice: Number(listPrice),
              mrp: Number(mrp),
              rating: Number(rating),
              reviews: Number(reviews),
              sales: Array.isArray(sales)
                ? sales.map((s) => parseInt(s, 10))
                : [],
              slug: `${slug}`,
              storeId: `${storeId}`,
              title: `${title}`,
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + AUTH_TOKEN,
          },
        }
      );

      setResponse(res.data.data.createProduct);
      toast.success("Product added successfully");
      navigate("/products");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err);
    }
    console.log(data);
  };

  console.log(response);

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
        <ProductForm onSubmit={handleSubmit} product={product} loading />
      </Stack>
    </Box>
  );
};

export default ProductAddPage;
