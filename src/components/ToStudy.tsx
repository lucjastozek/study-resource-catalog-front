import { SearchIcon } from "@chakra-ui/icons";
import {
    Badge,
    Center,
    Flex,
    Grid,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    useColorMode,
} from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { Resource } from "../interface/Resource";
import { TagI } from "../interface/Tag";
import { User } from "../interface/User";
import { filterContent } from "../utils/filterContent";
import { tagScheme } from "../utils/tagScheme";
import { tags } from "../utils/tags";
import { ResourceCard } from "./ResourceCard";
import { ResourceDetail } from "./ResourceDetail";
import { colorScheme } from "../utils/colorSchemes";

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
    selectedResource: Resource | undefined;
    activeUser: User;
    setFavourites: React.Dispatch<React.SetStateAction<Resource[]>>;
    resourceTags: TagI[];
}

export const ToStudy = ({
    favourites,
    setSelectedResource,
    usernames,
    linkPreviews,
    setResources,
    selectedResource,
    activeUser,
    setFavourites,
    resourceTags,
}: ToStudyProps): JSX.Element => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const filteredFavourites = filterContent(
        favourites,
        usernames,
        searchInput
    ).filter((resource) =>
        selectedTags.length > 0
            ? resourceTags
                  .filter((r) => r.resource_id === resource.resource_id)
                  .every((r) => selectedTags.includes(r.name))
            : true
    );

    const { colorMode } = useColorMode();
    const placeholderColor = colorMode === "dark" ? "white" : "black";

    const handleSelectTags = (tag: string) => {
        if (selectedTags.includes(tag)) {
            const newTags = selectedTags.filter((t) => t !== tag);
            setSelectedTags(newTags);
        } else {
            setSelectedTags((prev) => [...prev, tag]);
        }
    };

    return (
        <>
            <Heading>Your favourites</Heading>
            <Center marginInline={"auto"}>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        style={{ transform: "translateY(11px)" }}
                    >
                        <SearchIcon color="gray.300" />
                    </InputLeftElement>
                    <Input
                        mt={3}
                        onChange={(e) => setSearchInput(e.target.value)}
                        width={{ base: "100%", lg: "20vw" }}
                        value={searchInput}
                        placeholder="Find resources..."
                        _placeholder={{ color: placeholderColor }}
                    ></Input>
                </InputGroup>
            </Center>
            <Flex justifyContent={"center"} flexWrap={"wrap"}>
                {tags.map((tag, index) => (
                    <Badge
                        colorScheme={
                            colorScheme[tag as keyof typeof colorScheme]
                        }
                        key={index}
                        fontSize={{ base: "xs", lg: "sm" }}
                        size={{ base: "xs", lg: "sm" }}
                        margin={{ base: "0.2rem", lg: "0.5rem" }}
                        variant={
                            selectedTags.includes(tag) ? "solid" : "outline"
                        }
                        borderRadius={"9"}
                        textAlign={"center"}
                        padding={"0.5vh"}
                        onClick={() => handleSelectTags(tag)}
                        style={{
                            paddingTop: "1vh",
                            paddingBottom: "1vh",
                            paddingLeft: "1.5vh",
                            paddingRight: "1.5vh",
                        }}
                    >
                        {tag}
                    </Badge>
                ))}
                <Badge
                    fontSize={{ base: "xs", lg: "md" }}
                    margin={{ base: "0.2rem", lg: "0.5rem" }}
                    style={{
                        paddingTop: "1vh",
                        paddingBottom: "1vh",
                        paddingLeft: "1.5vh",
                        paddingRight: "1.5vh",
                    }}
                    borderRadius={"5"}
                    size={{ base: "xs", lg: "md" }}
                    onClick={() => setSelectedTags([])}
                >
                    Clear Tags
                </Badge>
            </Flex>

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
                {filteredFavourites
                    .sort((a, b) =>
                        moment(b.creation_date).diff(moment(a.creation_date))
                    )
                    .map((favourite) => (
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
                                (tag) =>
                                    tag.resource_id === favourite.resource_id
                            )}
                        />
                    ))}
            </Grid>
        </>
    );
};
