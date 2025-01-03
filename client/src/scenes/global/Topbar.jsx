/*
Purpose: is the component that will contain Top Bar title and lightmode/darkmode icon.
*/ 



import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";


const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" flexDirection = "row" justifyContent="space-between" p={2}>
      <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{mb: "5px",}}>Baader Demand Map</Typography>
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === "dark" ? (
          <DarkModeOutlinedIcon />
        ) : (
          <LightModeOutlinedIcon />
        )}
      </IconButton>
       
    </Box>
  );
};

export default Topbar;