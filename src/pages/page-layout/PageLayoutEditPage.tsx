import { useParams } from "react-router-dom";
import PageLayoutForm from "../../sections/page-layout/PageLayoutForm";
import { IPageLayout } from "../../types/page-layout";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getPageLayoutsFromLocal,
  setPageLayoutsToLocal,
} from "../../utils/localstorage";
import { Box, Card, CardContent, Typography } from "@mui/material";

const PageLayoutEditPage = () => {
  const { id } = useParams<{ id: string }>();

  const [pageLayout, setPageLayout] = useState<IPageLayout | null>(null);

  const handleEditPageLayout = (data: IPageLayout) => {
    const pageLayouts = getPageLayoutsFromLocal();

    const updatedPageLayout: IPageLayout = {
      id: id ? id : "",
      title: data?.title,
      path: pageLayout?.path ? pageLayout?.path : "",
      components: data?.components,
    };

    const updatedPageLayouts = {
      ...pageLayouts,
      [id!]: updatedPageLayout,
    };
    setPageLayoutsToLocal(updatedPageLayouts);
    toast.success("Pagelayout updated successfully");
  };

  useEffect(() => {
    const pagelayouts = getPageLayoutsFromLocal();
    const selectedpagelayout = pagelayouts?.[id!];
    setPageLayout(selectedpagelayout);
  }, [id]);

  return (
    <>
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
            <Typography
              variant="h5"
              fontWeight="bold"
              mb={3}
              textAlign="center"
            >
              Edit Page Layout
            </Typography>

            <PageLayoutForm
              pageLayout={pageLayout}
              isEdit
              onSubmit={handleEditPageLayout}
            />
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default PageLayoutEditPage;
