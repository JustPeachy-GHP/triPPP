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
import { Link } from "react-router-dom";
import triPPPimage from "../../Assets/triPPPimage.png";
import MuiDrawertwo from "./MuiDrawertwo";
import Navbar from "./Navbar";

const Header = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
  // console.log(theme);
  // const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  // console.log(isMatch);

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#F49867" }}>
        <Toolbar sx={{ width: "50%", margin: "0auto" }}>
          <div>
            <img src={triPPPimage} alt="" className="imagelogo" />
          </div>
          <MuiDrawertwo />
          {/* {isMatch ? ( */}
          <>
            <Typography
              sx={{ fontSize: "2rem", paddingLeft: "10px" }}
              className="logoname"
            ></Typography>
          </>
          {/* ) : ( */}
          <></>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
