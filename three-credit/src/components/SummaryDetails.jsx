import React from "react";

import { Box, Card, Divider, Paper, Typography } from "@mui/material";
import SummaryCard from "./SummaryCard";

function SummaryDetails({ links }) {
    return (
        <Box mt={4} width={"60%"}>
            <Box display={"flex"} flexWrap={"wrap"}>
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
