import { Avatar, Link, HStack } from "@chakra-ui/react";

interface TeamMemberProps {
    name: string;
    githubLink: string;
}

export function TeamMember({ name, githubLink }: TeamMemberProps): JSX.Element {
    return (
        <HStack spacing={1}>
            <Avatar name={name} size="lg" src={`./${name}-avatar.png`} />
            <Link
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                fontSize={{ base: "xl", lg: "xl" }}
            >
                {`/${githubLink.split("/").pop()}`}
            </Link>
        </HStack>
    );
}
