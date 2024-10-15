import { Product } from "../../types";
import { rootStyle } from "./Node";
import { Card, CardContent, Typography } from "@mui/material";

export type ProductProps = {
    p: Product;
};

function ProductComp({ p }: ProductProps) {
    return (
        <Card variant="outlined" sx={rootStyle}>
            <CardContent>
                <Typography variant="subtitle2">{p.name}</Typography>
            </CardContent>
        </Card>
    );
}

export default ProductComp;
