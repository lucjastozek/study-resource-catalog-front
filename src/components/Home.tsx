import { useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";
import { Comment } from "../interface/Comment";
import { LinkPreviews } from "../interface/LinkPreviews";
import { Resource } from "../interface/Resource";
import { TagI } from "../interface/Tag";
import { User } from "../interface/User";
import { Usernames } from "../interface/Usernames";
import { filterResourcesByKeywords } from "../utils/filterResourcesByKeywords";
import { filterResourcesByTags } from "../utils/filterResourcesByTags";
import { sortResourcesByDate } from "../utils/sortResourcesByDate";
import { tagScheme } from "../utils/tagScheme";
import { ResourceDetail } from "./ResourceDetail";
import { ResourcesTable } from "./ResourcesTable";
import { SearchBar } from "./SearchBar";
import { TagsCloud } from "./TagsCloud";
import { TopFiveResources } from "./TopFiveResources";

interface HomeProps {
    resources: Resource[];
    selectedResource: Resource | undefined;
    usernames: Usernames;
    linkPreviews: LinkPreviews;
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

export function Home({
    resources,
    selectedResource,
    usernames,
    linkPreviews,
    activeUser,
    resourceTags,
    comments,
    setComments,
    setSelectedResource,
    setFavourites,
    setResources,
}: HomeProps): JSX.Element {
    const [searchInput, setSearchInput] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const [isLargeScreen] = useMediaQuery("(min-width: 992px)");

    const filteredResources: Resource[] = filterResourcesByKeywords(
        resources,
        usernames,
        searchInput
    );

    const resourcesSortedByDate = sortResourcesByDate(
        filterResourcesByTags(
            [...filteredResources],
            selectedTags,
            resourceTags
        )
    );

    const imageURL =
        linkPreviews[selectedResource?.resource_id as number] ===
        "no image found"
            ? `https://fallback-image-api.onrender.com/?text=${selectedResource?.name}`
            : linkPreviews[selectedResource?.resource_id as number];

    return (
        <>
            <SearchBar
                searchInput={searchInput}
                setSearchInput={setSearchInput}
            />

            <TagsCloud
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
            />

            {selectedResource !== undefined && (
                <ResourceDetail
                    isOpen={true}
                    resource={selectedResource}
                    tagColor={
                        tagScheme[
                            selectedResource.recommendation_type as keyof typeof tagScheme
                        ]
                    }
                    imageLink={imageURL}
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
            )}

            <TopFiveResources
                filteredContent={filteredResources}
                isLargeScreen={isLargeScreen}
                resourcesSortedByDate={resourcesSortedByDate}
                selectedTags={selectedTags}
                resourceTags={resourceTags}
                setSelectedResource={setSelectedResource}
                usernames={usernames}
                linkPreviews={linkPreviews}
                setResources={setResources}
                setFavourites={setFavourites}
                activeUser={activeUser}
            />

            {isLargeScreen && (
                <ResourcesTable
                    resourcesSortedByDate={resourcesSortedByDate}
                    setSelectedResource={setSelectedResource}
                    usernames={usernames}
                    setResources={setResources}
                    setFavourites={setFavourites}
                    activeUser={activeUser}
                />
            )}
        </>
    );
}
