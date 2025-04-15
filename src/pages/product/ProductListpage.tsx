import {
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  IconButton,
  Link,
  Pagination,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Delete, Edit, Home } from "@mui/icons-material";
import useDebounce from "../../hooks/useDebounce";
import { useTable } from "../../hooks/useTable";
import { IProduct } from "../../types/product";
import { FetchProducts } from "../../graphql/product";

const ProductListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [searchProduct, setSearchProduct] = useState<string>(
    params.get("search") || ""
  );
  const [tab, setTab] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const { page, setPage, rowsPerPage, onChangePage } = useTable();

  const debouncedProduct = useDebounce(searchProduct, 500);

  const handleRowSelect = (title: string) => {
    setSelectedRows((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(title)) {
        newSelected.delete(title);
      } else {
        newSelected.add(title);
      }
      setSelectAll(newSelected.size === products.length);
      return newSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
    } else {
      const allTitles = new Set(products.map((p) => p.title));
      setSelectedRows(allTitles);
    }
    setSelectAll(!selectAll);
  };

  const handleTab = (_event: unknown, newValue: number) => {
    setTab(newValue);
    const tabNames = ["all", "active", "inactive", "expired", "handpicked"];
    const selectedTab = tabNames[newValue];
    const params = new URLSearchParams(location.search);
    params.delete("page");
    params.set("tab", selectedTab);
    if (selectedTab !== "all") {
      setPage(1);
    }
    navigate(`?${params.toString()}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchProduct(value);
    const params = new URLSearchParams(location.search);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    navigate(`?${params.toString()}`);
  };

  const handleSearchFocus = () => {
    const params = new URLSearchParams(location.search);
    const val = params.get("tab");
    navigate(`/products?page=1&tab=${val}`);
    setPage(1);
  };

  useEffect(() => {
    const getProducts = async () => {
      const limit = rowsPerPage;
      const skip = (page - 1) * rowsPerPage;
      const search = { title: debouncedProduct };
      let filter: {
        active?: boolean;
        expired?: boolean;
        handPicked?: boolean;
      } = {};
      if (tab === 1) filter = { active: true };
      if (tab === 2) filter = { active: false };
      if (tab === 3) filter = { expired: true };
      if (tab === 4) filter = { handPicked: true };

      try {
        const fetchedProducts = await FetchProducts(
          limit,
          search,
          skip,
          undefined,
          filter
        );
        setProducts(fetchedProducts.products);
        setCount(fetchedProducts.count);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, [debouncedProduct, page, rowsPerPage, tab]);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  return (
    <Box sx={{ ml: "auto", mr: "auto", width: "80%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
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
        </Breadcrumbs>
        <Button onClick={() => navigate("/products/new")}>Add Product</Button>
      </Box>

      <TextField
        value={searchProduct}
        onChange={handleSearchChange}
        onFocus={handleSearchFocus}
        sx={{ width: "100%", mb: 3 }}
      />

      <Grid component="div" sx={{ ml: 0, mr: 0 }}>
        <Tabs
          value={tab}
          onChange={handleTab}
          aria-label="brand filter tabs"
          sx={{ mb: 2 }}
        >
          <Tab label="All" value={0} />
          <Tab label="Active" value={1} />
          <Tab label="Inactive" value={2} />
          <Tab label="Expired" value={3} />
          <Tab label="Handpicked" value={4} />
        </Tabs>

        <TableContainer sx={{ maxWidth: "100%", border: "1px solid #555" }}>
          <Table sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    checked={selectAll}
                    onChange={handleSelectAll}
                    indeterminate={
                      selectedRows.size > 0 &&
                      selectedRows.size < products.length
                    }
                  />
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>Title</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Brand</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Category</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Deal Price</TableCell>
                <TableCell sx={{ textAlign: "center" }}>List Price</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.title}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.has(p.title)}
                      onChange={() => handleRowSelect(p.title)}
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: "left", width: "20%" }}>
                    <Box>
                      <img src={p.images[0]} width={40} height={40} />
                    </Box>
                    {p.title}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{p.brand}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {p.categoryPath
                      .replace(/_/g, " ")
                      .replace(/^\S+\s+/, "")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {p.dealPrice}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {p.listPrice}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton
                      onClick={() => navigate(`/product/${p.id}/edit`)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      {count < rowsPerPage ? null : (
        <Box sx={{ m: 2, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={Math.ceil(count / 10)}
            page={page}
            onChange={onChangePage}
          />
        </Box>
      )}
    </Box>
  );
};

export default ProductListPage;
