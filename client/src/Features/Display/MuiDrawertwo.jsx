import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Navbar from "./Navbar";



const MuiDrawertwo = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        className="drawervtwo"
      >
        <List>
              <ListItemIcon sx={{ fontSize: "20px", padding: "10px" }}>
                <Navbar/>
              </ListItemIcon>
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginRight: 5 }}
        onClick={() => setOpenDrawer(!openDrawer)}
        className="muidrawertwoiconbutton"
      >
        <MenuIcon className="muiiconimage"/>
 
      </IconButton>
    </React.Fragment>
  );
};

export default MuiDrawertwo;
