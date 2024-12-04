import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer" className="footer-side"
    >
      <Typography variant="body2" className="text-color-white" >
    Made with React using MUI@ All rights reserved.    
      </Typography>
    </Box>
  );
};

export default Footer;
