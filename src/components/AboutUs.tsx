import { Avatar, Center, Link, Stack, Text } from "@chakra-ui/react";

export function AboutUs() {
    return (
        <Center h="20vh" mt="10">
            <div style={{ textAlign: "center" }}>
                <Text fontSize="3xl" mt="20" mb="8">
                    We are Academy Cophort 7 C2 Group.
                </Text>
                <Center mt="5">
                    <Stack spacing={4} direction="row" align="center">
                        <Avatar name="L" size="lg" src="./Lucja-avatar.png" />
                        <Link
                            href="https://github.com/lucjastozek"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Text fontSize="xl">/lucjastozek</Text>
                        </Link>
                        <Avatar name="T" size="lg" src="./Tom-avatar.png" />
                        <Link
                            href="https://github.com/TomOwen93"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Text fontSize="xl">/TomOwen93</Text>
                        </Link>
                        <Avatar name="D" size="lg" src="./Dani-avatar.png" />
                        <Link
                            href="https://github.com/danivoro"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Text fontSize="xl">/danivoro</Text>
                        </Link>
                    </Stack>
                </Center>
                <Text fontSize="2xl" mt="10" mb="10">
                    This is our final week project.
                </Text>
            </div>
        </Center>
    );
}
