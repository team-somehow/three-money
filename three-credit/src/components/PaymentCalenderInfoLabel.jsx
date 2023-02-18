import { Box, Typography } from "@mui/material";
import React from "react";

import CheckIcon from "@mui/icons-material/Check";
import CircleIcon from "@mui/icons-material/Circle";

function PaymentCalenderInfoLabel() {
  return (
    <Box display={"flex"} justifyContent={"space-evenly"}>
      <Box display={"flex"} alignItems="center" justifyContent="space-evenly">
        <CheckIcon
          sx={{
            m: 2,
            color: "green",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        />
        <Typography>On time Pay</Typography>
      </Box>
      <Box display={"flex"} alignItems="center" justifyContent="space-evenly">
        <CircleIcon
          sx={{
            m: 2,
            color: "green",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        />
        <Typography>01-89 Days</Typography>
      </Box>
      <Box display={"flex"} alignItems="center" justifyContent="space-evenly">
        <CircleIcon
          sx={{
            m: 2,
            color: "red",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        />
        <Typography>01-89 Days</Typography>
      </Box>
    </Box>
  );
}

export default PaymentCalenderInfoLabel;
