import React from "react";

import { Box, Card, Divider, Paper, Typography } from "@mui/material";
import SummaryCard from "./SummaryCard";

function SummaryDetails({ links }) {
  return (
    <Box p={2} m={"auto"} width={"90%"}>
      <Typography variant="h3" py={2}>
        Summary
      </Typography>
      <Box
        display={"grid"}
        gridTemplateColumns={{
          xl: "auto auto auto",
          md: "auto auto",
          sm: "auto auto",
        }}
        gridTemplateRows={{ xl: "auto auto", sm: "auto auto auto" }}
        justifyContent={{
          xl: "space-evenly",
          sm: "space-evenly",
          xs: "center",
        }}
      >
        {links.map((r, i) => {
          return (
            <SummaryCard
              key={i}
              tagLabel={r.tagLabel}
              tagLabelColor={r.tagLabelColor}
              mainIcon={r.mainIcon}
              headingText={r.headingText}
              subText={r.subText}
              buttonHeading={r.buttonHeading}
              percentValue={r.percentValue}
              path={r.path}
              iconColor={r.iconColor}
            />
          );
        })}
      </Box>
    </Box>
  );
}

export default SummaryDetails;
