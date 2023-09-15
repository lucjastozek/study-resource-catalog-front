import { Heading } from "@chakra-ui/react";
import { Resource } from "../interface/Resource";
import { ResourceCard } from "./ResourceCard";

interface ToStudyProps {
    favourites: Resource[];
    setSelectedResource: React.Dispatch<
        React.SetStateAction<Resource | undefined>
    >;
    usernames: {
        [key: number]: string;
    };
    linkPreviews: { [key: number]: string };
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
}

export const ToStudy = ({
    favourites,
    setSelectedResource,
    usernames,
    linkPreviews,
    setResources,
}: ToStudyProps): JSX.Element => (
    <>
        <Heading>Your favourites</Heading>
        {favourites.map((favourite) => (
            <ResourceCard
                key={favourite.resource_id}
                resource={favourite}
                setSelectedResource={setSelectedResource}
                usernames={usernames}
                linkPreviews={linkPreviews}
                setResources={setResources}
            />
        ))}
    </>
);
