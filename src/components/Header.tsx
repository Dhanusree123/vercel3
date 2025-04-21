import { Home } from "@mui/icons-material";
import { Box, Button, Link, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 4,
        py: 2,
        color: "#fff",
        borderBottom: "1px solid #e0e0e0",
        backgroundColor: "#1AA7EC",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          component={Link}
          href="/"
          sx={{ fontWeight: 500, color: "#fff" }}
        >
          <Home />
        </Button>
        <Button
          component={Link}
          href="/page-layouts"
          sx={{ fontWeight: 500, color: "#fff" }}
        >
          <Typography>Pagelayouts</Typography>
        </Button>
      </Box>

      <Box>
        <Button
          component={Link}
          href="/page-layouts/add"
          sx={{ fontWeight: 500, color: "#fff" }}
        >
          <Typography>Add</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
