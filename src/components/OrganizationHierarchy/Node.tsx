import { MouseEvent, useState } from "react";
import {
    Card,
    CardHeader,
    IconButton,
    useTheme,
    Avatar,
    Menu,
    MenuItem,
    Badge,
    Tooltip,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DropTargetMonitor } from "react-dnd";
import { useDrop } from "react-dnd";
import { getRandomColor } from "../../utils";
import ResumePortfolio from "../Resume";
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

function Node({ org, onCollapse, collapsed }: NodeProps) {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openProfileDetail, setOpenProfileDetail] = useState<boolean>(false);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: "account",
        drop: () => ({ name: org.name }),
        collect: (monitor: DropTargetMonitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const isActive = canDrop && isOver;
    let backgroundColor = "white";
    if (isActive) {
        backgroundColor = "#ddffd2";
    } else if (canDrop) {
        backgroundColor = "#ffeedc";
    }

    const findDetails = (empId: string) => {
        const profile = details.find((d) => d["Emp-ID"] === empId) || null;

        return profile;
    };

    return (
        <>
            <Card
                variant="outlined"
                sx={{
                    ...rootStyle,
                    backgroundColor,
                }}
                ref={drop}
            >
                <CardHeader
                    avatar={
                        <Tooltip
                            title={`${
                                org?.reporties?.length || 0
                            } Sub Profile, ${
                                org.account?.length || 0
                            } Sub Account`}
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
                    action={
                        <IconButton size="small" onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                    }
                />
                <Menu
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <BusinessIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Add Sub Profile" />
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <AccountBalanceIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Add Sub Account" />
                    </MenuItem>
                </Menu>
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
