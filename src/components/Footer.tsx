import { Text, Center } from "@chakra-ui/react";

const repoLinkStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
};

export function Footer() {
    return (
        <Center h="20vh">
            <Text fontSize="xl" mt="5" textAlign={"center"}>
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
        </Center>
    );
}
