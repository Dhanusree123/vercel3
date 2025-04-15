import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const initialPage = Number(params.get("page")) || 1;

  const [page, setPage] = useState(initialPage);

  const rowsPerPage = 10;

  const onChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
    params.set("page", newPage.toString());
    navigate(`?${params.toString()}`);
  };

  return {
    page,
    setPage,
    rowsPerPage,
    onChangePage,
  };
};
