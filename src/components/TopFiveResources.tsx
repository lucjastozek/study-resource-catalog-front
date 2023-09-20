import { Grid } from "@chakra-ui/react";
import { Resource } from "../interface/Resource";
import { ResourceCard } from "./ResourceCard";
import { TagI } from "../interface/Tag";
import { Usernames } from "../interface/Usernames";
import { LinkPreviews } from "../interface/LinkPreviews";
import { User } from "../interface/User";

interface TopFiveResourcesProps {
    filteredContent: Resource[];
    isLargeScreen: boolean;
    resourcesSortedByDate: Resource[];
    selectedTags: string[];
    resourceTags: TagI[];
    setSelectedResource: React.Dispatch<
        React.SetStateAction<Resource | undefined>
    >;
    usernames: Usernames;
    linkPreviews: LinkPreviews;
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
    setFavourites: React.Dispatch<React.SetStateAction<Resource[]>>;
    activeUser: User;
}

export function TopFiveResources({
    filteredContent,
    isLargeScreen,
    resourcesSortedByDate,
    selectedTags,
    resourceTags,
    setSelectedResource,
    usernames,
    linkPreviews,
    setResources,
    setFavourites,
    activeUser,
}: TopFiveResourcesProps): JSX.Element {
    const copyLikesResources = [...filteredContent];

    const resourcesSortedByLikes = copyLikesResources
        .sort((a, b) => b.likes - a.likes)
        .filter((resource) =>
            selectedTags.length > 0
                ? resourceTags
                      .filter((r) => r.resource_id === resource.resource_id)
                      .some((r) => selectedTags.includes(r.name))
                : true
        );
    const slicedArray = isLargeScreen
        ? resourcesSortedByLikes.slice(0, 5)
        : resourcesSortedByDate;

    return (
        <Grid
            templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }}
            templateRows={{ base: "repeat(5, 1fr)", md: "1fr" }}
            gap={4}
            margin={4}
        >
            {slicedArray.map((resource: Resource) => (
                <ResourceCard
                    key={resource.resource_id}
                    resource={resource}
                    setSelectedResource={setSelectedResource}
                    usernames={usernames}
                    linkPreviews={linkPreviews}
                    setResources={setResources}
                    setFavourites={setFavourites}
                    activeUser={activeUser}
                    tags={resourceTags.filter(
                        (tag) => tag.resource_id === resource.resource_id
                    )}
                />
            ))}
        </Grid>
    );
}
