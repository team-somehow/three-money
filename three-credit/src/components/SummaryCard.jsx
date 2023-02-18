import React from "react";

import { Box, Card, Divider, Paper, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";

function SummaryCard({
    tagLabel,
    tagLabelColor,
    mainIcon,
    headingText,
    subText,
    buttonHeading,
    percentValue,
    path,
    iconColor,
}) {
    return (
        <Box
            data-aos="fade-up"
            component={Paper}
            my={2}
            mr={{ xl: 4, sm: 2 }}
            sx={{
                position: "relative",
                display: "flex",
                alignItems: "start",
                flexDirection: "column",
                justifyContent: "space-between",
                height: { xl: "400px", sm: "340px" },
                width: { xl: "360px", sm: "280px" },
                borderRadius: "10px",
                px: 4,
                py: { xl: 4, sm: 2 },
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                    boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.1)",
                    transform: "scale(1.05) !important",
                },
                overflow: "hidden",
            }}
        >
            <Box
                position={"absolute"}
                fontSize={"280px"}
                right={"-50px"}
                bottom={"-140px"}
                zIndex={"-1"}
                color={"rgba(0, 0, 0, 0.05)"}
            >
                {mainIcon}
            </Box>
            <Box
                position={"absolute"}
                bgcolor={tagLabelColor}
                px={2}
                py={0.5}
                sx={{
                    top: { xl: "30px", sm: "10px" },
                    right: 0,
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                    display: tagLabel ? "block" : "none",
                }}
            >
                <Typography variant="h5" fontSize={"26px"} color={"white"}>
                    {tagLabel}
                </Typography>
            </Box>
            <Box>
                <Box
                    sx={{
                        color: iconColor,
                        fontSize: { xl: "80px", sm: "40px" },
                    }}
                >
                    {mainIcon}
                </Box>
                <Typography
                    variant="h4"
                    sx={{
                        mt: { xl: 2, sm: 1 },
                        fontWeight: "bold",
                    }}
                >
                    {headingText}
                </Typography>
                <Typography variant="h6" fontSize={"24px"} fontWeight={"300"}>
                    {subText}
                </Typography>
            </Box>
            <Box width={"100%"}>
                <Link to={path}>
                    <Box width={"90%"} sx={{ cursor: "pointer" }}>
                        <Typography variant="h5" fontSize={"28px"}>
                            {buttonHeading}
                        </Typography>
                        <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            width={"100%"}
                            py={1}
                        >
                            <Typography
                                variant="h4"
                                color={"#9ab8c2"}
                                fontWeight={"bold"}
                            >
                                {percentValue}
                            </Typography>
                            <ArrowForwardIosIcon />
                        </Box>
                    </Box>
                </Link>
                <Box
                    sx={{
                        background: "#a9e1c9",
                        height: "10px",
                        width: "100%",
                        borderRadius: "10px",
                    }}
                />
            </Box>
        </Box>
    );
}

export default SummaryCard;
