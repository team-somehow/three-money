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
    Typography
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@arcana/auth-react";
import { useEffect, useState } from "react";
import contractAddress from "../../constants/contractAddress";
import { useLocation } from "react-router-dom";
import { faker } from "@faker-js/faker";
import QRCode from "qrcode.react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";

const steps = [
    {
        id: "0",
        message: "Welcome to Your personal Assitant",
        trigger: "1"
    },
    {
        id: "1",
        message: "What would you like  help with?",
        trigger: "2"
    },
    {
        id: "2",
        options: [
            { value: 1, label: "Accessing account details", trigger: "3" },
            { value: 2, label: "Apply for loans", trigger: "4" },
            { value: 3, label: "See my loans", trigger: "5" },
            { value: 3, label: "Exit", trigger: "8" }
        ]
    },
    {
        id: "3",
        message: "Click on My Account option on the left to access the Page",
        trigger: "6"
    },
    {
        id: "4",
        message: "Click on Apply loan option on the left to access the Page",
        trigger: "6"
    },
    {
        id: "5",
        message: "Click on my loans option on the left to access the Page",
        trigger: "6"
    },
    {
        id: "6",
        message: "Do you want any more help?",
        trigger: "7"
    },
    {
        id: "7",
        options: [
            { value: 1, label: "Yes", trigger: 1 },
            { value: 2, label: "No", trigger: 8 }
        ]
    },
    {
        id: "8",
        message: "Adios Amigo",
        trigger: "9"
    },
    {
        id: "9",
        message: "hello",
        end: true
    }
];
function DashboardNav({ routes }) {
    const [open, setOpen] = useState(false);

    const user = useAuth();
    const [userName, setUserName] = useState("Loading...");
    const [profileUrl, setProfileUrl] = useState("");
    useEffect(() => {
        if (user.user) {
            setUserName(user.user.name);
            setProfileUrl(user.user.picture);
        }
    }, [user]);
    const isCurrentNavActive = path => {
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
                width: 340,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: 340,
                    py: 4,
                    boxSizing: "border-box"
                }
            }}
        >
            <Toolbar>
                <img></img>
                <Link to="/dashboard/details">
                    <Typography
                        variant="h4"
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        ml={6}
                    >
                        <img
                            src="/logo.png"
                            width={"40px"}
                            style={{
                                marginRight: "16px"
                            }}
                        />
                        3 Money
                    </Typography>
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
                        height: 180
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
                {routes.map(r => (
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
                                    : "black"
                            }}
                        >
                            <ListItemButton sx={{ p: 2, px: 4 }}>
                                <ListItemIcon
                                    sx={{
                                        transition: "all 0.3s",
                                        fontSize: { xl: "30px", sm: "15px" },
                                        color: isCurrentNavActive(r.path)
                                            ? "white"
                                            : "black"
                                    }}
                                >
                                    {r.mainIcon}
                                </ListItemIcon>
                                <ListItemText
                                    sx={{
                                        fontSize: "24px",
                                        fontWeight: "bold"
                                    }}
                                    primary={r.headingText}
                                />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: 2,
                        padding: 5
                    }}
                >
                    <Typography textAlign={"center"} variant="h5">
                        See the transactions of our contract
                    </Typography>
                    <QRCode
                        value={`https://mumbai.polygonscan.com/address/${contractAddress}`}
                    />
                </Box>
            </List>
            <Button
                variant="contained"
                onClick={() => setOpen(prev => !prev)}
                fullWidth
                size="large"
                sx={{
                    py: 1,
                    display: open ? "none" : "flex",
                    position: "fixed",
                    zIndex: "999999 !important",
                    bottom: 20,
                    left: 20,
                    width: "300px",
                    alignItems: "center"
                }}
            >
                Open Chatbot
                <MarkChatUnreadIcon sx={{ ml: 3 }} />
            </Button>
            <Box
                sx={{
                    position: "fixed",
                    zIndex: "999999 !important",
                    bottom: 40,
                    left: 40,
                    width: "300px"
                }}
            >
                {open && (
                    <ThemeProvider
                        theme={{
                            background: "white",
                            botBubbleColor: "#0000ff",
                            userBubbleColor: "#40a0fc",
                            botFontColor: "#fff",
                            userFontColor: "#fff"
                        }}
                    >
                        <ChatBot
                            opened={open}
                            handleEnd={() => setOpen(false)}
                            steps={steps}
                        />
                    </ThemeProvider>
                )}
            </Box>
        </Drawer>
    );
}

export default DashboardNav;
