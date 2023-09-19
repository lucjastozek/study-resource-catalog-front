import {
    Avatar,
    AvatarBadge,
    Box,
    Button,
    Grid,
    Heading,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    Text,
    useMediaQuery,
} from "@chakra-ui/react";
import { User } from "../interface/User";
import { initialUser } from "../utils/initialUser";

interface HeaderProps {
    userImage: string;
    activeUser: User;
    setActiveUser: React.Dispatch<React.SetStateAction<User>>;
}

export function Header({
    userImage,
    activeUser,
    setActiveUser,
}: HeaderProps): JSX.Element {
    const [isLargeScreen] = useMediaQuery("(min-width: 992px)");

    return (
        <header>
            <Grid
                templateAreas={
                    isLargeScreen
                        ? `"empty heading avatar"`
                        : `"heading heading avatar"`
                }
                width={"100%"}
            >
                {isLargeScreen && (
                    <Text gridArea={"empty"} width={"20vw"}></Text>
                )}

                <Heading
                    gridArea={"heading"}
                    textAlign={"center"}
                    mb={5}
                    mt={5}
                    fontSize={{ base: "1.5rem", lg: "3rem" }}
                    margin={"auto"}
                >
                    Study Resources Catalog
                </Heading>

                <Popover>
                    <Box gridArea={"avatar"} width={"20vw"} marginLeft={"auto"}>
                        <PopoverTrigger>
                            <Box textAlign="center" mb={"4"}>
                                <Avatar src={userImage} name={activeUser?.name}>
                                    {activeUser.user_id > 0 && (
                                        <AvatarBadge
                                            boxSize="1.25em"
                                            bg="green.500"
                                        />
                                    )}
                                </Avatar>

                                {userImage !== "./undefined-avatar.png" && (
                                    <Text mt={2}>{activeUser?.name}</Text>
                                )}
                                {userImage === "./undefined-avatar.png" && (
                                    <Text mt={2}>
                                        Login to submit {activeUser?.name}{" "}
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
                                            setActiveUser(
                                                JSON.parse(initialUser)
                                            )
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
                                            setActiveUser(
                                                JSON.parse(initialUser)
                                            )
                                        }
                                    >
                                        <a href="/users">Sign in</a>
                                    </Button>
                                </PopoverBody>
                            </PopoverContent>
                        )}
                    </Portal>
                </Popover>
            </Grid>
        </header>
    );
}
