import {
  Box,
  CardContent,
  Chip,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Card from "@mui/material/Card";
import CustomImage from "../../components/custom-image/CustomImage";
import { currencyFormatter, transformImageUrl } from "../../utils/common";
import { useEffect, useState } from "react";
import { IProduct } from "../../types/product";
import { CommonSlideProps } from "../../types/global";
import { useFormContext } from "react-hook-form";
import DndGridContainer from "../../components/dnd-kit/DndGridContainer";
import { randomId } from "../../lib/randomId";
import AddImageDialog from "./AddImageDialog";

type Props = Partial<IProduct> & {
  loading?: boolean;
};

const ProductPreview = (props: Props) => {
  const {
    title,
    images = [],
    dealPrice,
    listPrice,
    mrp,
    loading = false,
  } = props;

  const [selectedPreview, setSelectedPreview] = useState<string>("");
  const [imageList, setImageList] = useState<CommonSlideProps[]>([]);
  const [selectedImage, setSelectedImage] = useState<CommonSlideProps | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const theme = useTheme();

  const {
    setValue,
    formState: { errors, isSubmitted },
  } = useFormContext();

  const toggleDialog = (item?: CommonSlideProps) => {
    setSelectedImage(item ?? null);
    setOpen(!open);
  };

  const handleImages = (items: CommonSlideProps[]) => {
    const updatedImages = items.map((item) => item.thumbnailUrl);
    setValue("images", updatedImages, { shouldValidate: true });
  };

  const handleSubmit = (data: string) => {
    if (selectedImage) {
      const index = selectedImage?.uniqueId?.split("_")[0];
      setValue(`images.${index}`, data, { shouldValidate: true });
    } else {
      setValue("images", [...images, data], { shouldValidate: true });
    }
    setOpen(false);
  };

  useEffect(() => {
    if (images && images.length) {
      setSelectedPreview(images[0]);
    }
    const transformedImages = images.map((image, index) => ({
      uniqueId: `${index}_${randomId()}`,
      thumbnailUrl: transformImageUrl(image, 150),
    }));
    setImageList(transformedImages);
  }, [images]);

  const mrpNumber = typeof mrp === "string" ? parseFloat(mrp) : mrp;
  const dealPriceNumber =
    typeof dealPrice === "string" ? parseFloat(dealPrice) : dealPrice;
  const listPriceNumber =
    typeof listPrice === "string" ? parseFloat(listPrice) : listPrice;

  return (
    <>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            {images && images.length ? (
              <CustomImage
                src={transformImageUrl(selectedPreview, 600)}
                alt={title}
                sx={{ maxWidth: "100%", height: "auto", borderRadius: 1 }}
              />
            ) : (
              <Skeleton
                sx={{ width: "100%", height: 280 }}
                animation={loading ? "wave" : false}
              />
            )}
            <Box
              sx={{
                p: 2,
                border:
                  errors?.images?.message && isSubmitted
                    ? `2px dashed ${theme.palette.error.main}`
                    : `2px dashed ${theme.palette.grey[500]}`,
                borderRadius: 1,
              }}
            >
              <DndGridContainer
                items={imageList}
                handleItems={handleImages}
                toggleDialog={toggleDialog}
                overFlow={true}
                handleOnClick={(item) => {
                  setSelectedPreview(item?.thumbnailUrl ?? "");
                }}
              />
            </Box>
            {isSubmitted && errors?.images?.message && (
              <Typography variant="body2" color="error">
                {errors.images?.message as string}
              </Typography>
            )}
            {title ? (
              <Typography variant="subtitle1">{title}</Typography>
            ) : (
              <Skeleton
                sx={{ width: "100%", height: 40 }}
                animation={loading ? "wave" : false}
              />
            )}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              {mrpNumber ? (
                <Typography variant="body1">
                  M.R.P. :&nbsp;
                  <Box component="span" sx={{ textDecoration: "line-through" }}>
                    {currencyFormatter.format(mrpNumber)}
                  </Box>
                </Typography>
              ) : (
                <Skeleton
                  sx={{ width: "50%" }}
                  animation={loading ? "wave" : false}
                />
              )}
              {listPriceNumber ? (
                <Typography variant="body1">
                  List Price : {currencyFormatter.format(listPriceNumber)}
                </Typography>
              ) : (
                <Skeleton
                  sx={{ width: "50%" }}
                  animation={loading ? "wave" : false}
                />
              )}
            </Stack>
            {dealPriceNumber ? (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={2}
                sx={{ border: "1px solid", borderRadius: 1, p: 1 }}
              >
                <Typography variant="h6">
                  Deal Price : {currencyFormatter.format(dealPriceNumber)}
                </Typography>
                {mrpNumber && dealPriceNumber ? (
                  <Chip
                    color="primary"
                    label={`-${Math.abs(
                      Math.round(
                        (Number(dealPriceNumber) / Number(mrpNumber)) * 100 -
                          100
                      )
                    )}%`}
                    sx={{
                      fontWeight: 700,
                    }}
                  />
                ) : null}
              </Stack>
            ) : (
              <Skeleton
                sx={{ width: "100%", height: 56 }}
                animation={loading ? "wave" : false}
              />
            )}
          </Stack>
        </CardContent>
      </Card>
      {open && (
        <AddImageDialog
          open={open}
          onSubmit={handleSubmit}
          onClose={toggleDialog}
          selectedImage={selectedImage}
        />
      )}
    </>
  );
};

export default ProductPreview;
