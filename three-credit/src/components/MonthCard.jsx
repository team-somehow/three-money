import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import CircleIcon from "@mui/icons-material/Circle";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
/**
 *
 * @param {boolean} isCurrent (default: false) - true when this is current month
 * @param {int} state (default: 0) - has 3 states: ontime(2), in3months(1), after3months(0)
 * @returns
 */
function MonthCard({ isCurrent = false, state }) {
  function getStatus(state) {
    if (state === 0)
      return (
        <CircleIcon
          sx={{
            m: "auto",
            color: "red",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        />
      );
    else if (state === 1)
      return (
        <CircleIcon
          sx={{
            m: "auto",
            color: "green",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        />
      );
    else if (state === 2)
      return (
        <CheckIcon
          sx={{
            m: "auto",
            color: "green",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        />
      );
    return;
  }
  return (
    <Box
      width={"60px"}
      height={"50px"}
      component={Paper}
      display={"flex"}
      alignItems={"center"}
      justifySelf={"center"}
    >
      {getStatus(state)}
    </Box>
  );
}

export default MonthCard;
