import { Box, Center, Stack, Text } from "@chakra-ui/react";
import { TeamMember } from "./TeamMember";

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
                        <TeamMember
                            name="Lucja"
                            githubLink="https://github.com/lucjastozek"
                        />
                        <TeamMember
                            name="Tom"
                            githubLink="https://github.com/TomOwen93"
                        />
                        <TeamMember
                            name="Dani"
                            githubLink="https://github.com/danivoro"
                        />
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
