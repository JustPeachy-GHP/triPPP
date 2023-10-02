import React, { useState } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded"; // replace here with our icon
import MuiDrawertwo from "./MuiDrawertwo";
import Navbar from "./Navbar";
const Header = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);

  return (
    <React.Fragment>
        {/* below here is the navbar coloring, you can also style the size here too I think */}
      <AppBar sx={{ background: "#F49867" }}> 
        <Toolbar>
        {/* starting here below is the icon addeding and that they are using a mui and adjusting it, import it and then do <blahh/> */}
          <AddBusinessRoundedIcon sx={{ transform: "scale(2)" }} />
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
                Title of brand here
              </Typography>
              {/* //things working but why is this here or is it needed - TO BE CHECKED BC LINKING WORKS NOW */}
              <MuiDrawertwo />
            </>
          ) : (
            <>
            {/* //is it here? the  tabs? the LINKING, routes?*/}
              <Navbar/> 


              <Button sx={{ marginLeft: "auto", background:"#D96E48"  }} variant="contained">
                Login
              </Button>
              <Button sx={{ marginLeft: "10px", background:"#D96E48"  }} variant="contained">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;



