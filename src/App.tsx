import { Box, Stack, Typography } from "@mui/material";
import organization from "./data/org.json";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Organization from "./components/OrganizationHierarchy";
import { useState } from "react";
import ProjectHierarchy from "./components/ProjectHierarchy";
import Switch from "@mui/material/Switch";

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
    const [hierarchy, setHierarchy] = useState<"organization" | "project">(
        "organization"
    );
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHierarchy(event.target.checked ? "organization" : "project");
    };

    return (
        <ThemeProvider theme={theme}>
            <Box padding={4}>
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        alignItems: "center",
                        position: "fixed",
                        top: "20px",
                        right: "20px",
                    }}
                >
                    <Typography>Project Hierarchy</Typography>
                    <Switch
                        checked={hierarchy === "organization" ? true : false}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                    />
                    <Typography>Organization Hierarchy</Typography>
                </Stack>
                <Typography sx={{ mt: 5 }}>
                    {hierarchy === "organization" ? (
                        <Organization o={organization} />
                    ) : (
                        <ProjectHierarchy />
                    )}
                </Typography>
            </Box>
        </ThemeProvider>
    );
}
