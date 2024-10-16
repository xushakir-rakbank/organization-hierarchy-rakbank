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
    data: any;
    onCollapse: () => void;
    collapsed: boolean;
};

export default function Node({ data, onCollapse, collapsed }: NodeProps) {
    const theme = useTheme();
    const [openDetail, setOpenDetail] = useState<boolean>(false);

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
                            badgeContent={data?.nestedData?.length || 0}
                            onClick={() => setOpenDetail(true)}
                        >
                            <Avatar
                                sx={{
                                    ...avatarStyle,
                                    bgcolor: getRandomColor(),
                                }}
                            >
                                {data?.name?.charAt(0)?.toUpperCase()}
                            </Avatar>
                        </Badge>
                    }
                    title={
                        <Typography
                            sx={{ cursor: "pointer", mr: 1 }}
                            onClick={() => setOpenDetail(true)}
                        >
                            {data?.name}
                        </Typography>
                    }
                    action={
                        (data?.nestedData?.length || 0 > 0) && (
                            <IconButton
                                size="small"
                                sx={{
                                    mt: 1,
                                    marginLeft: "auto",
                                    transition: theme.transitions.create(
                                        "transform",
                                        {
                                            duration:
                                                theme.transitions.duration
                                                    .short,
                                        }
                                    ),
                                    transform: collapsed
                                        ? "rotate(0deg)"
                                        : "rotate(180deg)",
                                }}
                                onClick={() => onCollapse()}
                            >
                                <ExpandMore />
                            </IconButton>
                        )
                    }
                />
            </Card>

            {openDetail && data.id ? (
                <ProjectDetails
                    open={openDetail}
                    setOpen={() => setOpenDetail(false)}
                    project={data}
                />
            ) : (
                <UserDetails
                    profile={findDetails(data?.emplID || "")}
                    open={openDetail}
                    setOpen={() => setOpenDetail(false)}
                />
            )}
        </>
    );
}
