import { DndProvider } from "react-dnd";
import { Box } from "@mui/material";
import { HTML5Backend } from "react-dnd-html5-backend";
import organization from "./data/org.json";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Organization from "./components/OrganizationHierarchy";

const theme = createTheme({
    palette: {
        background: {
            default: "#ECECF4",
        },
    },
    typography: {
        fontFamily: "Roboto, sans-serif",
    },
});

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Box padding={4}>
                <DndProvider backend={HTML5Backend}>
                    <Organization o={organization} />
                </DndProvider>
            </Box>
        </ThemeProvider>
    );
}
