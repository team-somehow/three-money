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

function DashboardNav({ routes }) {
    const user = useAuth();
    const [userName, setUserName] = useState("Vinay Kanse");
    useEffect(() => {
        if (user.user) {
            setUserName(user.user.name);
        }
    }, [user]);

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
                    src={`https://robohash.org/${userName}?set=set2`}
                />
                <Typography mt={2} variant="h4">
                    {userName}
                </Typography>
            </Box>
            <Divider />
            <List>
                {routes.map((r) => (
                    <Link to={r.path} key={r.headingText}>
                        <ListItem key={r.headingText} disablePadding>
                            <ListItemButton sx={{ p: 2, px: 4 }}>
                                <ListItemIcon
                                    sx={{
                                        fontSize: { xl: "30px", sm: "15px" },
                                        color: "black",
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
