/*
Purpose: will contain main components and context providers to run application.  
*/


import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/sidebar/Sidebar";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { PartStructureProvider } from "./context/part-structure-context/part-structure-context";
import Dashboard from "./scenes/dashboard"

const  App = () => {

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);


  return (
    <PartStructureProvider>
      <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className="app" display="flex" flexDirection="row" height="100vh" width="100vw">
          <Sidebar isSidebar={isSidebar} />
          <Box display="flex" flexDirection="column"  flexGrow="1">
            <Topbar setIsSidebar={setIsSidebar}/>
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
      </ColorModeContext.Provider>
    </PartStructureProvider>
  
  );
}

export default App;
