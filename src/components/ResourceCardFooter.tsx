import {
    Button,
    CardFooter,
    HStack,
    Tag,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Resource } from "../interface/Resource";
import { User } from "../interface/User";
import { handleDeleteFavourites } from "../utils/deleteHandlers";
import { formatTimeSubmitted } from "../utils/formatTimeSubmitted";
import { handleDislike, handleLike } from "../utils/likeHandlers";

interface ResourceCardFooterProps {
    resource: Resource;
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
    setFavourites: React.Dispatch<React.SetStateAction<Resource[]>>;
    activeUser: User;
}

export function ResourceCardFooter({
    resource,
    setResources,
    setFavourites,
    activeUser,
}: ResourceCardFooterProps): JSX.Element {
    const location = useLocation();
    const { resource_id, creation_date, dislikes, likes } = resource;

    return (
        <CardFooter
            pb={"0"}
            pr={"0"}
            pl={0}
            alignItems={"end"}
            justify={"center"}
        >
            <VStack w={"100vw"}>
                <HStack>
                    <Tag
                        cursor={"pointer"}
                        onClick={() =>
                            handleLike(
                                resource_id,
                                setResources,
                                setFavourites,
                                activeUser.user_id
                            )
                        }
                        fontWeight={"bold"}
                        colorScheme="green"
                    >
                        {" "}
                        {likes} Likes 👍
                    </Tag>{" "}
                    <Tag
                        cursor={"pointer"}
                        onClick={() =>
                            handleDislike(
                                resource_id,
                                setResources,
                                setFavourites,
                                activeUser.user_id
                            )
                        }
                        fontWeight={"bold"}
                        colorScheme="red"
                    >
                        {" "}
                        {dislikes} Dislikes 👎
                    </Tag>{" "}
                </HStack>

                {location.pathname === "/study" && (
                    <Button
                        onClick={() =>
                            handleDeleteFavourites(
                                resource_id,
                                setResources,
                                setFavourites,
                                activeUser.user_id
                            )
                        }
                    >
                        Remove from Favourites
                    </Button>
                )}

                <Text
                    mb={"0.3rem"}
                    mt={"1rem"}
                    ml={"auto"}
                    pr={"1rem"}
                    as={"i"}
                >
                    Submitted {formatTimeSubmitted(creation_date)}
                </Text>
            </VStack>
        </CardFooter>
    );
}
