import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { formatPathName } from "../utils/formatPathName";

interface LinkButtonProps {
    path: string;
}

export function LinkButton({ path }: LinkButtonProps): JSX.Element {
    return (
        <Link to={`/${path}`}>
            <Button
                size={{ base: "sm", lg: "md" }}
                textTransform={"capitalize"}
            >
                {formatPathName(path)}
            </Button>
        </Link>
    );
}
