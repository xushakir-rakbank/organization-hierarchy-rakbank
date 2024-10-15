import { Card, CardContent, CardProps } from "@mui/material";
import { SxProps } from "@mui/system";
import { ReactNode } from "react";

interface ResumeCardProps extends CardProps {
    children: ReactNode;
    sx?: SxProps;
}

export default function ResumeCard({
    children,
    sx,
    ...props
}: ResumeCardProps) {
    return (
        <Card {...props} sx={{ borderRadius: 3, boxShadow: 3, mb: 2, ...sx }}>
            <CardContent>{children}</CardContent>
        </Card>
    );
}
