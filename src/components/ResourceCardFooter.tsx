import {
    Button,
    CardFooter,
    HStack,
    Tag,
    Text,
    VStack,
} from "@chakra-ui/react";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { Resource } from "../interface/Resource";
import { User } from "../interface/User";
import { handleDeleteFavourites } from "../utils/deleteHandlers";
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
                                resource.resource_id,
                                setResources,
                                setFavourites,
                                activeUser.user_id
                            )
                        }
                        fontWeight={"bold"}
                        colorScheme="green"
                    >
                        {" "}
                        {resource.likes} Likes 👍
                    </Tag>{" "}
                    <Tag
                        cursor={"pointer"}
                        onClick={() =>
                            handleDislike(
                                resource.resource_id,
                                setResources,
                                setFavourites,
                                activeUser.user_id
                            )
                        }
                        fontWeight={"bold"}
                        colorScheme="red"
                    >
                        {" "}
                        {resource.dislikes} Dislikes 👎
                    </Tag>{" "}
                </HStack>

                {location.pathname === "/study" && (
                    <Button
                        onClick={() =>
                            handleDeleteFavourites(
                                resource.resource_id,
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
                    Submitted{" "}
                    {moment().diff(moment(resource.creation_date), "days") === 0
                        ? `${moment().diff(
                              moment(resource.creation_date),
                              "hours"
                          )} hours ago`
                        : `${moment().diff(
                              moment(resource.creation_date),
                              "days"
                          )} days ago`}
                </Text>
            </VStack>
        </CardFooter>
    );
}
