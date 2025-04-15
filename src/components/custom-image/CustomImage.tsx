import { Box, BoxProps } from "@mui/material";
import { useEffect, useState } from "react";

import imagePlaceholder from "../../assets/image-placeholder.png";
type Props = BoxProps & {
  src: string;
  alt?: string;
};

const CustomImage = (props: Props) => {
  const { src, alt, sx, ...other } = props;
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  useEffect(() => {
    setError(false);
  }, [src]);

  return (
    <Box
      component="img"
      src={!error ? src : imagePlaceholder}
      alt={alt}
      onError={handleError}
      sx={sx}
      {...other}
    />
  );
};

export default CustomImage;
