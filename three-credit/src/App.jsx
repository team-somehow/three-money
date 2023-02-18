import { RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { routes } from "./routes";
import { useAuth } from "@arcana/auth-react";
import { CircularProgress } from "@mui/material";
import CreditDataContextProvider from "./contexts/CreditDataContextProvider";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const darkTheme = createTheme({
    palette: {
        primary: { main: "#977dde" },
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
