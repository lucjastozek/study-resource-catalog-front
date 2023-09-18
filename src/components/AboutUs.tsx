import { Avatar, Box, Center, Link, Stack, Text } from "@chakra-ui/react";

export function AboutUs() {
    return (
        <Center h={{ base: "50vh", lg: "20vh" }} mt={{ base: 20, lg: 10 }}>
            <Box textAlign="center">
                <Text fontSize={{ base: "xl", lg: "3xl" }} mt="20" mb="8">
                    We are Academy Cohort 7 C2 Group.
                </Text>
                <Center mt="5">
                    <Stack
                        spacing={4}
                        direction={{ base: "column", lg: "row" }}
                        align="center"
                    >
                        <Avatar name="L" size="lg" src="./Lucja-avatar.png" />
                        <Link
                            href="https://github.com/lucjastozek"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Text fontSize={{ base: "xl", lg: "xl" }}>
                                /lucjastozek
                            </Text>
                        </Link>
                        <Avatar name="T" size="lg" src="./Tom-avatar.png" />
                        <Link
                            href="https://github.com/TomOwen93"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Text fontSize={{ base: "xl", lg: "xl" }}>
                                /TomOwen93
                            </Text>
                        </Link>
                        <Avatar name="D" size="lg" src="./Dani-avatar.png" />
                        <Link
                            href="https://github.com/danivoro"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Text fontSize={{ base: "xl", lg: "xl" }}>
                                /danivoro
                            </Text>
                        </Link>
                    </Stack>
                </Center>
                <Text
                    fontSize={{ base: "xl", lg: "2xl" }}
                    mt="10"
                    mb={{ base: 20, lg: 10 }}
                >
                    This is our final week project.
                </Text>
            </Box>
        </Center>
    );
}
