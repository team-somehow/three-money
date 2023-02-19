import { RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { routes } from "./routes";
import { useAuth } from "@arcana/auth-react";
import { CircularProgress, Box,Typography } from "@mui/material";
import AOS from "aos";
import { useEffect } from "react";
const darkTheme = createTheme({
    palette: {
        primary: { main: "#977dde" }
    }
});

function App() {
    const auth = useAuth();

    useEffect(() => {
        AOS.init();
    }, []);
    if (auth.loading)
        return (
            <div className="center-container">
                <CircularProgress />
            </div>
        );

    if (window.innerWidth < 991) {
        return (
            <Box
                sx={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                }}
            >
                <Typography variant="h4" textAlign={"center"}>
                    Please access on desktop for full viewing experience
                </Typography>
            </Box>
        );
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <RouterProvider router={routes} />
        </ThemeProvider>
    );
}

export default App;
