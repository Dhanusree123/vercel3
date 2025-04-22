import PageLayoutForm from "../../sections/page-layout/PageLayoutForm";
import { IPageLayout } from "../../types/page-layout";
import { toast } from "sonner";
import {
  getPageLayoutsFromLocal,
  setPageLayoutsToLocal,
} from "../../utils/localstorage";
import { nanoid } from "nanoid";
import { Box, Card, CardContent, Typography } from "@mui/material";

const PageLayoutAddPage = () => {
  const handleAddPageLayout = (data: IPageLayout) => {
    const id = nanoid();
    const newPageLayout = {
      ...data,
      id,
    };

    const existingPageLayouts = getPageLayoutsFromLocal();

    const isDuplicate = Object.values(existingPageLayouts).some(
      (layout: IPageLayout) => layout.path === data.path && layout.id !== id
    );

    if (isDuplicate) {
      toast.error(`Pagelayout with pathname ${data.path} already exists`);
      return;
    }
    const updated = {
      ...existingPageLayouts,
      [id]: newPageLayout,
    };
    setPageLayoutsToLocal(updated);
    toast.success("PageLayout added successfully");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 4,
        px: 2,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 600, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
            Add New Page Layout
          </Typography>
          <PageLayoutForm isEdit={false} onSubmit={handleAddPageLayout} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default PageLayoutAddPage;
