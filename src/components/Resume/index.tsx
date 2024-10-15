import React from "react";
import {
    Grid,
    Typography,
    Box,
    Avatar,
    Divider,
    List,
    ListItemButton,
    ListItemText,
    Dialog,
} from "@mui/material";
import ResumeCard from "./ResumeCard";
import { Profile } from "../../types";

interface ResumePortfolioProps {
    profile: Profile | null;
    open: boolean;
    setOpen: (status: boolean) => void;
}

export default function ResumePortfolio({
    profile,
    open,
    setOpen,
}: ResumePortfolioProps) {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
            <Box sx={{ p: 2 }}>
                {profile ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <ResumeCard>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}
                                >
                                    <Avatar
                                        alt={profile.Name}
                                        src={profile.Name.charAt(
                                            0
                                        ).toUpperCase()}
                                        sx={{ width: 100, height: 100 }}
                                    />
                                    <Typography
                                        variant="h5"
                                        component="div"
                                        sx={{ mt: 2 }}
                                    >
                                        {profile.Name}
                                    </Typography>
                                    <Typography
                                        color="text.secondary"
                                        sx={{ mt: 1 }}
                                    >
                                        {profile.Designation}
                                    </Typography>
                                </Box>

                                <Divider sx={{ mb: 2 }} />

                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{ mt: 2 }}
                                >
                                    Skills
                                </Typography>
                                <List component="nav" dense>
                                    {profile["Primary-Skill"]
                                        ?.split(", ")
                                        ?.map((s, index) => (
                                            <ListItemButton key={index}>
                                                <ListItemText
                                                    primary={s}
                                                    // secondary={r.title}
                                                />
                                            </ListItemButton>
                                        ))}
                                </List>
                            </ResumeCard>

                            <ResumeCard>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{ textAlign: "center" }}
                                >
                                    Experience
                                </Typography>
                                <Box sx={{ mt: 2, textAlign: "center" }}>
                                    {profile["Total Epx"]} {"Year(s)"}
                                </Box>
                            </ResumeCard>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <ResumeCard>
                                <Typography variant="h6" component="div">
                                    Functional Knowledge
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                    {profile["Functional-Knowledge"]
                                        ?.split(", ")
                                        ?.map((r, index) => (
                                            <React.Fragment key={index}>
                                                <Box sx={{ mb: 3 }}>
                                                    <Typography variant="subtitle1">
                                                        {r}
                                                    </Typography>
                                                </Box>
                                            </React.Fragment>
                                        ))}
                                </Box>
                            </ResumeCard>
                        </Grid>
                    </Grid>
                ) : (
                    <em>No Data Found!</em>
                )}
            </Box>
        </Dialog>
    );
}
