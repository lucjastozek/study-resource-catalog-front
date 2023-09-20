import {
    Avatar,
    AvatarBadge,
    Box,
    Button,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    Text,
} from "@chakra-ui/react";

import { initialUser } from "../utils/initialUser";
import { User } from "../interface/User";

interface ActiveUserAvatarProps {
    activeUser: User;
    userImage: string;
    setActiveUser: React.Dispatch<React.SetStateAction<User>>;
}

export function ActiveUserAvatar({
    userImage,
    activeUser,
    setActiveUser,
}: ActiveUserAvatarProps): JSX.Element {
    return (
        <>
            <Popover>
                <Box gridArea={"avatar"} width={"20vw"} marginLeft={"auto"}>
                    <PopoverTrigger>
                        <Box textAlign="center" mb={"4"}>
                            <Avatar src={userImage} name={activeUser.name}>
                                {activeUser.user_id > 0 && (
                                    <AvatarBadge
                                        boxSize="1.25em"
                                        bg="green.500"
                                    />
                                )}
                            </Avatar>

                            {activeUser.user_id > 0 ? (
                                <Text mt={2}>{activeUser.name}</Text>
                            ) : (
                                <Text mt={2}>
                                    Login to submit {activeUser.name}{" "}
                                </Text>
                            )}
                        </Box>
                    </PopoverTrigger>
                </Box>

                <Portal>
                    {userImage !== "./undefined-avatar.png" && (
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverHeader>
                                Do you want to sign out?
                            </PopoverHeader>
                            <PopoverCloseButton />
                            <PopoverBody>
                                <Button
                                    colorScheme="blue"
                                    onClick={() =>
                                        setActiveUser(JSON.parse(initialUser))
                                    }
                                >
                                    <a href="/users">Sign Out</a>
                                </Button>
                            </PopoverBody>
                        </PopoverContent>
                    )}
                    {userImage === "./undefined-avatar.png" && (
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverHeader>
                                Do you want to sign in?
                            </PopoverHeader>
                            <PopoverCloseButton />
                            <PopoverBody>
                                <Button
                                    colorScheme="blue"
                                    onClick={() =>
                                        setActiveUser(JSON.parse(initialUser))
                                    }
                                >
                                    <a href="/users">Sign in</a>
                                </Button>
                            </PopoverBody>
                        </PopoverContent>
                    )}
                </Portal>
            </Popover>
        </>
    );
}
