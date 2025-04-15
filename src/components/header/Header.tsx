import { Bedtime, Menu, WbSunny } from "@mui/icons-material";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

type ThemeProps = {
  mode: "light" | "dark";
  toggleTheme: () => void;
};

const Header = ({ mode, toggleTheme }: ThemeProps) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const DrawerList = (
    <Box>
      <List>
        {[
          { text: "Products", path: "/products" },
          { text: "Brands", path: "/brands" },
        ].map((item, index) => (
          <ListItem key={index} onClick={() => handleNavigation(item.path)}>
            <ListItemButton>
              <ListItemText primary={item.text}></ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <>
      <Box
        sx={{
          border: "2px solid dashed",
          display: "flex",
          justifyContent: "space-between",
          position: "sticky",
        }}
      >
        <IconButton onClick={toggleDrawer(true)}>
          <Menu />
        </IconButton>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "dark" ? <WbSunny /> : <Bedtime />}
          </IconButton>
          <Button onClick={handleLogout}>Logout</Button>
        </Box>
      </Box>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
};

export default Header;
