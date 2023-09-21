import { Grid, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { Comment } from "../interface/Comment";
import { Resource } from "../interface/Resource";
import { TagI } from "../interface/Tag";
import { User } from "../interface/User";
import { filterResourcesByKeywords } from "../utils/filterResourcesByKeywords";
import { filterResourcesByTags } from "../utils/filterResourcesByTags";
import { sortResourcesByDate } from "../utils/sortResourcesByDate";
import { tagScheme } from "../utils/tagScheme";
import { ResourceCard } from "./ResourceCard";
import { ResourceDetail } from "./ResourceDetail";
import { SearchBar } from "./SearchBar";
import { TagsCloud } from "./TagsCloud";

interface ToStudyProps {
    favourites: Resource[];
    usernames: {
        [key: number]: string;
    };
    linkPreviews: { [key: number]: string };
    selectedResource: Resource | undefined;
    activeUser: User;
    resourceTags: TagI[];
    comments: Comment[];
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    setSelectedResource: React.Dispatch<
        React.SetStateAction<Resource | undefined>
    >;
    setFavourites: React.Dispatch<React.SetStateAction<Resource[]>>;
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
}

export function ToStudy({
    favourites,
    usernames,
    linkPreviews,
    selectedResource,
    activeUser,
    resourceTags,
    comments,
    setComments,
    setResources,
    setFavourites,
    setSelectedResource,
}: ToStudyProps): JSX.Element {
    const [searchInput, setSearchInput] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const filteredFavourites = filterResourcesByKeywords(
        favourites,
        usernames,
        searchInput
    );

    const resourcesSortedByDate = sortResourcesByDate(
        filterResourcesByTags(
            [...filteredFavourites],
            selectedTags,
            resourceTags
        )
    );

    return (
        <>
            <Heading>Your favourites</Heading>
            <SearchBar
                searchInput={searchInput}
                setSearchInput={setSearchInput}
            />

            <TagsCloud
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
            />

            {selectedResource !== undefined ? (
                <ResourceDetail
                    isOpen={true}
                    resource={selectedResource}
                    tagColor={
                        tagScheme[
                            selectedResource.recommendation_type as keyof typeof tagScheme
                        ]
                    }
                    imageLink={linkPreviews[selectedResource.resource_id]}
                    username={usernames[selectedResource.user_id]}
                    setSelectedResource={setSelectedResource}
                    setResources={setResources}
                    activeUser={activeUser}
                    setFavourites={setFavourites}
                    comments={comments}
                    setComments={setComments}
                    tags={resourceTags.filter(
                        (tag) =>
                            tag.resource_id === selectedResource.resource_id
                    )}
                />
            ) : (
                <></>
            )}
            <Grid
                templateColumns={{
                    base: `1fr`,
                    lg: "repeat(5, 1fr)",
                }}
                templateRows={{
                    base: `repeat(${Math.ceil(favourites.length)}, 1fr)`,
                    lg: `repeat(${Math.ceil(favourites.length / 5)}, 1fr)`,
                }}
                gap={4}
                margin={4}
            >
                {resourcesSortedByDate.map((favourite) => (
                    <ResourceCard
                        key={favourite.resource_id}
                        resource={favourite}
                        setSelectedResource={setSelectedResource}
                        usernames={usernames}
                        linkPreviews={linkPreviews}
                        setResources={setResources}
                        setFavourites={setFavourites}
                        activeUser={activeUser}
                        tags={resourceTags.filter(
                            (tag) => tag.resource_id === favourite.resource_id
                        )}
                    />
                ))}
            </Grid>
        </>
    );
}
