import { Grid, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { User } from "../interface/User";
import { ActiveUserAvatar } from "./ActiveUserAvatar";

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

                <ActiveUserAvatar
                    activeUser={activeUser}
                    setActiveUser={setActiveUser}
                    userImage={userImage}
                />
            </Grid>
        </header>
    );
}
