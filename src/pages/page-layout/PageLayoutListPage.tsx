import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
} from "@mui/material";
import { IPageLayout } from "../../types/page-layout";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getPageLayoutsFromLocal } from "../../utils/localstorage";

const PageLayoutListPage = () => {
  const navigate = useNavigate();
  const [layouts, setLayouts] = useState<IPageLayout[]>([]);

  useEffect(() => {
    const pagelayouts = getPageLayoutsFromLocal();
    if (pagelayouts) {
      const data = Object.values(pagelayouts) as IPageLayout[];
      setLayouts(data);
    }
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Page Layouts
        </Typography>
      </Box>

      <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
        {layouts.length === 0 ? (
          <Typography variant="h6" textAlign="center">
            No layouts found.Start by adding..!
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>No</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Path</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {layouts.map((layout, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{layout.title}</TableCell>
                  <TableCell
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        color: "blue",
                        textDecoration: "underline",
                      },
                    }}
                    onClick={() => navigate(`/page-layout/${layout.path}`)}
                  >
                    {layout.path}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() =>
                        layout.id && navigate(`/page-layouts/${layout.id}`)
                      }
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Container>
  );
};

export default PageLayoutListPage;
