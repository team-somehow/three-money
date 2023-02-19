import { Mail } from "@mui/icons-material";
import {
    Button,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function DashboardNav({ routes }) {
    const getIsActiveLink = (path) => {
        const route = useLocation().pathname;
        if (route == path) return true;
        else return false;
    };
    return (
        <Drawer
            variant="permanent"
            data-aos="fade-right"
            sx={{
                position: "relative",
                display: { xl: "initial", sm: "none", xs: "none" },
                width: 300,
                height: "100vh",
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: 300,
                    py: 4,
                    boxSizing: "border-box",
                },
            }}
        >
            <Toolbar>
                <img></img>
                <Link to="/dashboard">
                    <Typography
                        variant="h4"
                        display={"flex"}
                        alignItems={"baseline"}
                    >
                        <img
                            src="/logo.png"
                            width={"80px"}
                            style={{
                                marginRight: "16px",
                            }}
                        />
                        3 Credit
                    </Typography>
                </Link>
            </Toolbar>
            <Divider />
            <List>
                {routes.map((r) => (
                    <Link to={r.path} key={r.headingText}>
                        <ListItem
                            key={r.headingText}
                            disablePadding
                            sx={{
                                bgcolor: getIsActiveLink(r.path)
                                    ? "#618ef8"
                                    : "initial",
                                color: getIsActiveLink(r.path)
                                    ? "white"
                                    : "initial",

                                transition: "all 0.3s",
                            }}
                        >
                            <ListItemButton sx={{ p: 2, px: 4 }}>
                                <ListItemIcon
                                    sx={{
                                        fontSize: { xl: "30px", sm: "15px" },
                                        color: getIsActiveLink(r.path)
                                            ? "white"
                                            : "initial",
                                        transition: "all 0.3s",
                                    }}
                                >
                                    {r.mainIcon}
                                </ListItemIcon>
                                <ListItemText
                                    sx={{ fontSize: "24px" }}
                                    primary={r.headingText}
                                />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Drawer>
    );
}

export default DashboardNav;
