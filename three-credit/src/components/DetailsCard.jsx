import { Box, Divider, Paper, Typography } from "@mui/material";
import React from "react";

function DetailsCard({
    mainHeading,
    lastUpdated,
    label,
    labelBackground,
    leftHeadingNumber,
    leftHeadingTitle,
    rightHeadingNumber,
    rightHeadingTitle,
}) {
    return (
        <Box
            data-aos="zoom-in"
            width={"100%"}
            component={Paper}
            m={"auto"}
            my={4}
            boxShadow={"0 0 10px 0 rgba(0, 0, 0, 0.1)"}
            borderRadius={"25px"}
        >
            <Box
                display={"flex"}
                alignItems={"center"}
                pt={3}
                justifyContent={"space-between"}
            >
                <Box px={3} py={2}>
                    <Typography variant="h4" fontWeight={"bold"}>
                        {mainHeading}
                    </Typography>
                    <Typography>
                        Last updated on <b>{lastUpdated}</b>
                    </Typography>
                </Box>
                <Box
                    bgcolor={labelBackground}
                    sx={{
                        p: 1,
                        pl: 2,
                        borderTopLeftRadius: "10px",
                        borderBottomLeftRadius: "10px",
                    }}
                >
                    <Typography color={"white"} px={3}>
                        {label}
                    </Typography>
                </Box>
            </Box>
            <Divider />
            <Box display={"flex"}>
                <Box width={"50%"} ml={3} py={3}>
                    <Typography variant="h4" fontWeight={"bold"}>
                        {leftHeadingNumber}
                    </Typography>
                    <Typography variant="h6">{leftHeadingTitle}</Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box width={"50%"} ml={3} py={3}>
                    <Typography variant="h4" fontWeight={"bold"}>
                        {rightHeadingNumber}
                    </Typography>
                    <Typography variant="h6">{rightHeadingTitle}</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default DetailsCard;
