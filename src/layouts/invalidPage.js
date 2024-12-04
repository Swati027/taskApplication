import React from "react";
import NotFound from '../assets/images/not-found.webp'
import { Box, Typography } from "@mui/material";

function PageNotFound(){
    return(
        <Box sx={{marginLeft:'22ch'}} >
   <img src={NotFound}  />

        </Box>
    )
}
export default PageNotFound;