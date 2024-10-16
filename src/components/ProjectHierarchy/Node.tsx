import {
    Card,
    Typography,
    CardHeader,
    Badge,
    Avatar,
    IconButton,
    useTheme,
} from "@mui/material";
import { useState } from "react";
import {
    avatarStyle,
    findDetails,
    rootStyle,
} from "../OrganizationHierarchy/Node";
import { getRandomColor } from "../../utils";
import { ExpandMore } from "@mui/icons-material";
import UserDetails from "../UserDetails";
import ProjectDetails from "./ProjectDetails";

export type NodeProps = {
    project: any;
    user?: any;
    onCollapse: () => void;
    collapsed: boolean;
};

export default function Node({
    project,
    onCollapse,
    collapsed,
    user,
}: NodeProps) {
    const theme = useTheme();
    const [openProfileDetail, setOpenProfileDetail] = useState<boolean>(false);

    return (
        <>
            <Card
                variant="outlined"
                sx={{
                    ...rootStyle,
                }}
            >
                <CardHeader
                    avatar={
                        <Badge
                            style={{ cursor: "pointer" }}
                            color="secondary"
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            showZero
                            invisible={!collapsed}
                            overlap="circular"
                            badgeContent={project?.users?.length || 0}
                            onClick={() => setOpenProfileDetail(true)}
                        >
                            <Avatar
                                sx={{
                                    ...avatarStyle,
                                    bgcolor: getRandomColor(),
                                }}
                            >
                                {project?.name?.charAt(0)?.toUpperCase()}
                            </Avatar>
                        </Badge>
                    }
                    title={
                        <Typography
                            sx={{ cursor: "pointer" }}
                            onClick={() => setOpenProfileDetail(true)}
                        >
                            {user?.name || project?.name}
                        </Typography>
                    }
                />
                {(project?.users?.length || 0 > 0) && (
                    <IconButton
                        size="small"
                        sx={{
                            marginTop: -5,
                            marginLeft: "auto",
                            transition: theme.transitions.create("transform", {
                                duration: theme.transitions.duration.short,
                            }),
                            transform: collapsed
                                ? "rotate(0deg)"
                                : "rotate(180deg)",
                        }}
                        onClick={() => onCollapse()}
                    >
                        <ExpandMore />
                    </IconButton>
                )}
            </Card>

            {openProfileDetail && project.name ? (
                <ProjectDetails
                    open={openProfileDetail}
                    setOpen={() => setOpenProfileDetail(false)}
                    project={project}
                />
            ) : (
                <UserDetails
                    profile={findDetails(user?.emplID || "")}
                    open={openProfileDetail}
                    setOpen={() => setOpenProfileDetail(false)}
                />
            )}
        </>
    );
}
