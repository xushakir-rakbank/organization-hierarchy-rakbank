import { avatarStyle, rootStyle } from "./Node";
import { useDrag } from "react-dnd";
import { Card, CardHeader, Avatar } from "@mui/material";
import { getRandomColor } from "../../utils";
import { Account } from "../../types";

export type AccountProps = {
    a: Account;
};

export interface DropResult {
    name: string;
}

function AccountComp({ a }: AccountProps) {
    const [{ isDragging }, drag] = useDrag({
        type: "account",
        item: { name: a.name },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult() as DropResult;
            if (item && dropResult) {
                alert(`You moved ${item.name} to ${dropResult.name}`);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1;

    return (
        <Card
            variant="outlined"
            sx={{
                ...rootStyle,
                cursor: "pointer",
                opacity,
            }}
            ref={drag}
        >
            <CardHeader
                avatar={
                    <Avatar sx={{ ...avatarStyle, bgcolor: getRandomColor() }}>
                        {a.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={a.name}
            />
        </Card>
    );
}

export default AccountComp;
