import { useState } from "react";
import {
    Card,
    CardHeader,
    IconButton,
    useTheme,
    Avatar,
    Badge,
    Tooltip,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { getRandomColor } from "../../utils";
import ResumePortfolio from "../UserDetails";
import details from "../../data/details.json";
import { Employee } from "../../types";

export type NodeProps = {
    org: Employee;
    onCollapse: () => void;
    collapsed: boolean;
};

export const rootStyle = {
    background: "white",
    display: "inline-block",
    borderRadius: 16,
};

export const avatarStyle = {
    width: 40,
    height: 40,
};

export const findDetails = (empId: string) => {
    const profile = details.find((d) => d["Emp-ID"] === empId) || null;

    return profile;
};

function Node({ org, onCollapse, collapsed }: NodeProps) {
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
                        <Tooltip
                            title={`${org?.reporties?.length || 0} Sub Profile`}
                            arrow
                        >
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
                                badgeContent={org.reporties?.length || 0}
                                onClick={() => setOpenProfileDetail(true)}
                            >
                                <Avatar
                                    sx={{
                                        ...avatarStyle,
                                        bgcolor: getRandomColor(),
                                    }}
                                >
                                    {org.name.charAt(0).toUpperCase()}
                                </Avatar>
                            </Badge>
                        </Tooltip>
                    }
                    title={
                        <Typography
                            sx={{ cursor: "pointer" }}
                            onClick={() => setOpenProfileDetail(true)}
                        >
                            {org.name}
                        </Typography>
                    }
                />
                {(org?.reporties?.length || 0 > 0) && (
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
                        onClick={onCollapse}
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                )}
            </Card>

            {openProfileDetail && (
                <ResumePortfolio
                    profile={findDetails(org.emplID || "")}
                    open={openProfileDetail}
                    setOpen={() => setOpenProfileDetail(false)}
                />
            )}
        </>
    );
}

export default Node;
