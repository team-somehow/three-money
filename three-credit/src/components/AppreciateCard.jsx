import { Box, Typography } from "@mui/material";
import React from "react";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function AppreciateCard({
  icon = <ThumbUpIcon color="inherit" fontSize="inherit" />,
  iconColor = "#7bc4a6",
  headingText,
  subHeading,
  label,
  backgroundColor = "#f0faf7",
  headingTextColor = "#8dd4b7",
}) {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      position={"relative"}
      bgcolor={backgroundColor}
      p={4}
      borderRadius={"10px"}
      boxShadow={"0 0 4px 0 rgba(0, 0, 0, 0.1)"}
      my={4}
    >
      <Box position={"absolute"} right={"18px"} top={"10px"}>
        <Typography variant="p" fontSize={"24px"} color={"#99a3a0"}>
          {label}
        </Typography>
      </Box>
      <Box color={iconColor} pr={6} fontSize={"64px"}>
        {icon}
      </Box>
      <Box>
        <Typography variant="h4" color={headingTextColor}>
          {headingText}
        </Typography>
        <Typography variant="h6">{subHeading}</Typography>
      </Box>
    </Box>
  );
}

export default AppreciateCard;
