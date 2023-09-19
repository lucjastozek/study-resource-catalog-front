import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { HStack, IconButton, useColorMode } from "@chakra-ui/react";
import { LinkButton } from "./LinkButton";

export function Navigation(): JSX.Element {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <nav>
            <HStack
                justifyContent={"center"}
                wrap={{ base: "wrap", lg: "nowrap" }}
            >
                <LinkButton path="home" />
                <LinkButton path="study" />
                <LinkButton path="users" />
                <LinkButton path="submit-new" />
                <LinkButton path="about-us" />

                <IconButton
                    icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                    onClick={toggleColorMode}
                    size={{ base: "sm", lg: "md" }}
                    aria-label="toggle color mode button"
                />
            </HStack>
        </nav>
    );
}
