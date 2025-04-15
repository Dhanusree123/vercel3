import { forwardRef } from "react";
import { Icon } from "@iconify/react";

import { Box } from "@mui/material";
import type { BoxProps } from "@mui/material";

type Props = BoxProps & {
  icon: string;
  width?: number;
};

const Iconify = (props: Props, ref: React.Ref<SVGSVGElement>) => {
  const { icon, width = 20, sx, ...other } = props;
  return (
    <Box
      component="span" // Use a valid wrapper for Material-UI Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width,
        height: width,
        ...sx,
      }}
      {...other}
    >
      <Icon ref={ref} icon={icon} width={width} height={width} />
    </Box>
  );
};

export default forwardRef(Iconify);
