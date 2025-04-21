import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IPageLayout } from "../../types/page-layout";
import { getPageLayoutsFromLocal } from "../../utils/localstorage";

const PageLayoutsPage = () => {
  const { path } = useParams();

  const [pageLayout, setPageLayout] = useState<IPageLayout | null>(null);
  console.log(path);

  useEffect(() => {
    const layouts = getPageLayoutsFromLocal();

    if (layouts) {
      const layoutsArray = Object.values(layouts) as IPageLayout[];
      const matchedPageLayout = layoutsArray.find(
        (layout) => layout.path === path
      );
      setPageLayout(matchedPageLayout || null);
    }
  }, [path]);

  return (
    <>
      <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
        <Card sx={{ mb: 4, boxShadow: 3 }}>
          <CardContent>
            <Typography
              variant="h5"
              fontWeight="bold"
              textAlign="center"
              mb={2}
            >
              {pageLayout?.title}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" mb={1}>
              ID: {pageLayout?.id}
            </Typography>
            <Typography variant="body1">Path: {pageLayout?.path}</Typography>
          </CardContent>
        </Card>

        <Typography variant="h5" fontWeight="medium" mb={2}>
          Components
        </Typography>

        <Stack spacing={2}>
          {pageLayout?.components.map((component) => (
            <Card key={component.id} sx={{ boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {component.title}
                </Typography>
                <Typography variant="body2">
                  Component ID: {component.id}
                </Typography>
                <Typography variant="body2">
                  Status:
                  {component.active ? "Active" : "Inactive"}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default PageLayoutsPage;
