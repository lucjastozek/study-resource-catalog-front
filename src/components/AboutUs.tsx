import { Text, Center } from "@chakra-ui/react";

const repoLinkStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
};

export function AboutUs() {
    return (
        <Center h="20vh">
            <div style={{ textAlign: "center" }}>
                <Text fontSize="3xl" mt="10">
                    We are Academy Cophort 7 C2 Group.
                </Text>
                <Text fontSize="3xl" mt="3">
                    This is our final week project.
                </Text>
                <Text fontSize="xl" mt="5">
                    You can visit our{" "}
                    <a
                        href="https://github.com/lucjastozek/study-resource-catalog-front"
                        style={repoLinkStyle}
                    >
                        frontend
                    </a>{" "}
                    and{" "}
                    <a
                        href="https://github.com/danivoro/C7C2-study-app-server"
                        style={repoLinkStyle}
                    >
                        backend
                    </a>{" "}
                    repositories here.
                </Text>
            </div>
        </Center>
    );
}
