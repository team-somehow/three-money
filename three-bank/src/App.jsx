import { RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { routes } from "./routes";
import { useAuth } from "@arcana/auth-react";
import { CircularProgress } from "@mui/material";

const darkTheme = createTheme({
	palette: {
		primary: { main: "#977dde" },
	},
});

function App() {
	const auth = useAuth();

	if (auth.loading)
		return (
			<div className="center-container">
				<CircularProgress />
			</div>
		);

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<RouterProvider router={routes} />
		</ThemeProvider>
	);
}

export default App;
