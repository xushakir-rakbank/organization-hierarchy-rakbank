import React from "react";
import {
    Grid,
    Typography,
    Box,
    Avatar,
    Divider,
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
} from "@mui/material";
import Card from "./Card";
import { Profile } from "../../types";
import {
    getAllPreviousProjects,
    getCurrentQuarter,
    getRandomColor,
    loadProfileImage,
} from "../../utils";
import projects from "../../data/projects.json";
import { Close } from "@mui/icons-material";

export function LabelAndText({ label, text }: { label: string; text: string }) {
    return (
        <>
            <Typography component="div" sx={{ mt: 1, fontSize: "16px" }}>
                {label}
            </Typography>
            <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mb: 2, fontSize: "16px" }}
            >
                {text}
            </Typography>
        </>
    );
}
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
    const currentYear = new Date().getFullYear();

    const { quarter, startMonth, endMonth } = getCurrentQuarter();

    let currentQuarterProject = profile?.[`${quarter}-Project`];
    currentQuarterProject = projects.find(
        (p) => currentQuarterProject === p.id
    );
    const previousProjects = getAllPreviousProjects(profile);

    return (
        <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
            <DialogTitle sx={{ borderBottom: "1px solid #eee" }}>
                <Typography variant="h6" sx={{ m: 1, width: "100%" }}>
                    User Details
                    <IconButton
                        onClick={handleClose}
                        sx={{ float: "right", mt: "-10px" }}
                    >
                        <Close />
                    </IconButton>
                </Typography>
            </DialogTitle>
            <DialogContent sx={{ p: 2 }}>
                {profile ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Card>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}
                                >
                                    <Avatar
                                        alt={profile.Name}
                                        src={
                                            loadProfileImage(profile.Name) ||
                                            profile.Name.charAt(0).toUpperCase()
                                        }
                                        sx={{
                                            width: 100,
                                            height: 100,
                                            bgcolor: getRandomColor(),
                                            fontSize: "30px",
                                        }}
                                    />
                                    <Typography
                                        variant="h5"
                                        component="div"
                                        sx={{ mt: 1 }}
                                    >
                                        {profile.Name}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {profile.Designation}
                                    </Typography>
                                </Box>

                                <Divider sx={{ mb: 2, mt: 2 }} />
                                <Typography component="div" sx={{ m: 2 }}>
                                    <LabelAndText
                                        label="Network ID"
                                        text={profile.networkID}
                                    />
                                    <LabelAndText label="Company" text="RAK" />
                                    <LabelAndText
                                        label="Location"
                                        text={profile.Location}
                                    />
                                    <LabelAndText
                                        label="DOJ"
                                        text={profile.DOJ?.toString()}
                                    />
                                </Typography>
                                <Divider sx={{ mb: 2, mt: 2 }} />
                                <Typography variant="h6" component="div">
                                    Skills
                                </Typography>

                                <Typography component="div" sx={{ m: 2 }}>
                                    <LabelAndText
                                        label="Primary"
                                        text={profile["Primary-Skill"]}
                                    />
                                    <LabelAndText
                                        label="Secondary"
                                        text={profile["Secondary-Skills"]}
                                    />
                                    <LabelAndText
                                        label="Functional"
                                        text={profile["Functional-Knowledge"]}
                                    />
                                    <LabelAndText
                                        label="Application"
                                        text={profile.Squad}
                                    />
                                </Typography>
                            </Card>

                            <Card>
                                <Typography variant="h6" component="div">
                                    Some Heading
                                </Typography>
                                <Typography component="div" sx={{ m: 2 }}>
                                    <LabelAndText
                                        label="Experience"
                                        text={`${profile[
                                            "Total Epx"
                                        ]?.toString()} year(s)`}
                                    />
                                    <LabelAndText
                                        label="Salary"
                                        text={
                                            profile[
                                                `Sal-${currentYear.toString()}`
                                            ]
                                        }
                                    />
                                    <LabelAndText
                                        label="Prev Rating"
                                        text={
                                            profile[
                                                `Rating-${(
                                                    currentYear - 1
                                                ).toString()}`
                                            ]
                                        }
                                    />
                                    <LabelAndText
                                        label="PAR"
                                        text={profile.PAR}
                                    />
                                    <LabelAndText
                                        label="WOR"
                                        text={profile.WOR}
                                    />
                                </Typography>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Card>
                                <Typography variant="h6" component="div">
                                    Current Project
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                    <LabelAndText
                                        label={currentQuarterProject?.name}
                                        text={`${startMonth} ${currentYear} - ${endMonth} ${currentYear}`}
                                    />
                                    <Typography
                                        component="div"
                                        sx={{ mt: 1, fontSize: "16px" }}
                                    >
                                        {profile.PAR}
                                    </Typography>
                                    <Typography
                                        component="div"
                                        sx={{ mt: 1, fontSize: "16px" }}
                                    >
                                        {profile.WOR}, Contract end date:{" "}
                                        {profile["Contract-End-date"]}
                                    </Typography>
                                </Box>
                            </Card>
                            <Card>
                                <Typography variant="h6" component="div">
                                    Project Projects and Experience
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                    {previousProjects.map((p) => {
                                        const {
                                            project,
                                            quarter: {
                                                startMonth: sm,
                                                endMonth: em,
                                            },
                                        } = p;
                                        return (
                                            <>
                                                <LabelAndText
                                                    label={project?.name || ""}
                                                    text={`${sm} ${currentYear} - ${em} ${currentYear}`}
                                                />
                                                <Typography
                                                    component="div"
                                                    sx={{
                                                        mt: 1,
                                                        fontSize: "16px",
                                                        mb: 2,
                                                    }}
                                                >
                                                    {profile.PAR} -{" "}
                                                    {profile.WOR}
                                                </Typography>
                                            </>
                                        );
                                    })}
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                ) : (
                    <em>No Data Found!</em>
                )}
            </DialogContent>
        </Dialog>
    );
}
