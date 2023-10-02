import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; //replace here with out icon import
import Navbar from "./Navbar";
// import triPPPimage from "../Assets";

// const pages = ["demo", "not linked", "just text", "need to connect to navbar"];
const MuiDrawertwo = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
              <ListItemIcon sx={{ fontSize: "20px", padding: "10px" }}>
                <Navbar/>
              </ListItemIcon>
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }} //color of the drop down icon the 3 lines - you can style the coloring here maybe..
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
        {/* <triPPPimage/> */}
      </IconButton>
    </React.Fragment>
  );
};

export default MuiDrawertwo;
