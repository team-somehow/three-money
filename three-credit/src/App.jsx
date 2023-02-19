import { RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { routes } from "./routes";
import { useAuth } from "@arcana/auth-react";
import { CircularProgress, Typography, Box } from "@mui/material";
import CreditDataContextProvider from "./contexts/CreditDataContextProvider";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const darkTheme = createTheme({
    palette: {
        primary: { main: "#618ef8" },
    },

    typography: {
        fontFamily: ["Poppins", "Nunito", "Roboto", "Arial", "sans-serif"].join(
            ","
        ),
    },
});

function App() {
    const auth = useAuth();
    useEffect(() => {
        AOS.init();
    }, []);
    // if (auth.loading)
    //     return (
    //         <div className="center-container">
    //             <CircularProgress />
    //         </div>
    //     );

    if (window.innerWidth < 991) {
        return (
            <Box
                sx={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
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
            <CreditDataContextProvider>
                <RouterProvider router={routes} />
            </CreditDataContextProvider>
        </ThemeProvider>
    );
}

export default App;
