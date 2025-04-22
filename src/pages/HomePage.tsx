import { Box, Button, Link, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Box
      sx={{
        mt: "25vh",
        mx: "auto",
        display: "flex",
        maxWidth: 600,
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Typography variant="h2">WELCOME TO HOME PAGE</Typography>
      <Button
        variant="contained"
        sx={{ mt: 4 }}
        component={Link}
        href="/page-layouts"
        disableRipple
      >
        Go To PageLayouts
      </Button>
    </Box>
  );
};

export default HomePage;
