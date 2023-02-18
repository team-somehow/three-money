import {
    Box,
    Avatar,
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
import { Link } from "react-router-dom";
import { useAuth } from "@arcana/auth-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { faker } from "@faker-js/faker";

function DashboardNav({ routes }) {
    const user = useAuth();
    const [userName, setUserName] = useState("Vinay Kanse");
    const [profileUrl, setProfileUrl] = useState(faker.image.avatar());
    useEffect(() => {
        if (user.user) {
            setUserName(user.user.name);
            setProfileUrl(user.user.picture);
        }
    }, [user]);
    const isCurrentNavActive = (path) => {
        const currentRoute = useLocation().pathname;
        if (currentRoute == path) return true;
        else return false;
    };
    return (
        <Drawer
            variant="permanent"
            data-aos="fade-right"
            sx={{
                position: "relative",
                // display: { xl: "initial", sm: "none", xs: "none" },
                width: 300,
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
                <Link to="/dashboard/details">
                    <Typography variant="h3">3 Money</Typography>
                </Link>
            </Toolbar>
            <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                my={4}
            >
                <Avatar
                    sx={{
                        backgroundColor: "#eee",
                        width: 180,
                        height: 180,
                    }}
                    alt={userName}
                    src={profileUrl}
                />
                <Typography mt={2} variant="h4">
                    {userName}
                </Typography>
            </Box>
            <Divider />
            <List>
                {routes.map((r) => (
                    <Link to={r.path} key={r.headingText}>
                        <ListItem
                            key={r.headingText}
                            disablePadding
                            sx={{
                                transition: "all 0.3s",
                                bgcolor: isCurrentNavActive(r.path)
                                    ? "blue"
                                    : "initial",
                                color: isCurrentNavActive(r.path)
                                    ? "white"
                                    : "black",
                            }}
                        >
                            <ListItemButton sx={{ p: 2, px: 4 }}>
                                <ListItemIcon
                                    sx={{
                                        transition: "all 0.3s",
                                        fontSize: { xl: "30px", sm: "15px" },
                                        color: isCurrentNavActive(r.path)
                                            ? "white"
                                            : "black",
                                    }}
                                >
                                    {r.mainIcon}
                                </ListItemIcon>
                                <ListItemText
                                    sx={{
                                        fontSize: "24px",
                                        fontWeight: "bold",
                                    }}
                                    primary={r.headingText}
                                />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Button
                sx={{
                    position: "absolute",
                    bottom: "10px",
                    color: "red",
                }}
                variant="text"
                fullWidth
            >
                Logout
            </Button>
        </Drawer>
    );
}

export default DashboardNav;
