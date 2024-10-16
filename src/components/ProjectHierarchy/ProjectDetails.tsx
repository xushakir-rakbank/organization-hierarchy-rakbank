import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
} from "@mui/material";
import React from "react";
import { Project } from "../../types";
import { Close } from "@mui/icons-material";
import { LabelAndText } from "../UserDetails";

export default function ProjectDetails({
    project,
    open,
    setOpen,
}: {
    project: Project;
    open: boolean;
    setOpen: (status: boolean) => void;
}) {
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
            <DialogTitle sx={{ borderBottom: "1px solid #eee" }}>
                <Typography variant="h6" sx={{ m: 1, width: "100%" }}>
                    Project Details
                    <IconButton
                        onClick={handleClose}
                        sx={{ float: "right", mt: "-10px" }}
                    >
                        <Close />
                    </IconButton>
                </Typography>
            </DialogTitle>
            <DialogContent sx={{ p: 2 }}>
                <Typography variant="h6">Name</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    {project.name}
                </Typography>
                <Typography variant="h6">Description</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    {project.description}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>
                    Technologies Used
                </Typography>
                {project.technologies.map((t) => (
                    <Typography
                        key={t}
                        component="span"
                        sx={{
                            border: "1px solid #eee",
                            p: 1,
                            mr: 1,
                            borderRadius: "10px",
                        }}
                    >
                        {t}
                    </Typography>
                ))}
            </DialogContent>
        </Dialog>
    );
}
