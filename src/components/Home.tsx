import {
    ArrowDownIcon,
    ArrowUpIcon,
    ExternalLinkIcon,
    SearchIcon,
} from "@chakra-ui/icons";
import {
    Badge,
    Center,
    Flex,
    Grid,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tooltip,
    Tr,
    useColorMode,
    useMediaQuery,
} from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { Resource } from "../interface/Resource";
import { TagI } from "../interface/Tag";
import { User } from "../interface/User";
import { colorScheme } from "../utils/colorSchemes";
import { filterContent } from "../utils/filterContent";
import { tagScheme } from "../utils/tagScheme";
import { tags } from "../utils/tags";
import { ResourceCard } from "./ResourceCard";
import { ResourceDetail } from "./ResourceDetail";
import { handleDislike, handleLike } from "../utils/likeHandlers";

interface HomeProps {
    resources: Resource[];
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
    selectedResource: Resource | undefined;
    setSelectedResource: React.Dispatch<
        React.SetStateAction<Resource | undefined>
    >;
    usernames: {
        [key: number]: string;
    };
    linkPreviews: {
        [key: number]: string;
    };
    activeUser: User;
    setFavourites: React.Dispatch<React.SetStateAction<Resource[]>>;
    resourceTags: TagI[];
}

export const Home = ({
    resources,
    setResources,
    selectedResource,
    setSelectedResource,
    usernames,
    linkPreviews,
    activeUser,
    setFavourites,
    resourceTags,
}: HomeProps): JSX.Element => {
    const [searchInput, setSearchInput] = useState<string>("");
    const filteredContent: Resource[] = filterContent(
        resources,
        usernames,
        searchInput
    );
    const { colorMode } = useColorMode();
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const placeholderColor = colorMode === "dark" ? "white" : "black";

    const copyLikesResources = [...filteredContent];
    const resourcesSortedByLikes = copyLikesResources
        .sort((a, b) => b.likes - a.likes)
        .filter((resource) =>
            selectedTags.length > 0
                ? resourceTags
                      .filter((r) => r.resource_id === resource.resource_id)
                      .every((r) => selectedTags.includes(r.name))
                : true
        );

    const copyDateResources = [...filteredContent];
    const resourcesSortedByDate = copyDateResources
        .sort((a, b) => moment(b.creation_date).diff(moment(a.creation_date)))
        .filter((resource) =>
            selectedTags.length > 0
                ? resourceTags
                      .filter((r) => r.resource_id === resource.resource_id)
                      .every((r) => selectedTags.includes(r.name))
                : true
        );

    const handleSelectTags = (tag: string) => {
        if (selectedTags.includes(tag)) {
            const newTags = selectedTags.filter((t) => t !== tag);
            setSelectedTags(newTags);
        } else {
            setSelectedTags((prev) => [...prev, tag]);
        }
    };

    const [isLargeScreen] = useMediaQuery("(min-width: 992px)");

    const slicedArray = isLargeScreen
        ? resourcesSortedByLikes.slice(0, 5)
        : resourcesSortedByDate;

    return (
        <>
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
                        size={{ base: "xs", lg: "sm" }}
                        fontSize={{ base: "xs", lg: "sm" }}
                        margin={{ base: "0.2rem", lg: "0.5rem" }}
                        variant={
                            selectedTags.includes(tag) ? "solid" : "outline"
                        }
                        borderRadius={"9"}
                        textAlign={"center"}
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
                    size={{ base: "sm", lg: "md" }}
                    fontSize={{ base: "xs", lg: "md" }}
                    margin={{ base: "0.2rem", lg: "0.5rem" }}
                    padding={"0.5vh"}
                    borderRadius={"9"}
                    onClick={() => setSelectedTags([])}
                    style={{
                        paddingTop: "1vh",
                        paddingBottom: "1vh",
                        paddingLeft: "1.5vh",
                        paddingRight: "1.5vh",
                    }}
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

            {isLargeScreen && (
                <Table
                    margin={"auto"}
                    size={{ base: "sm", lg: "ms" }}
                    width={{ base: "auto", lg: "80vw" }}
                    variant={"striped"}
                >
                    <Thead>
                        <Tr textAlign={"center"}>
                            <Th textAlign={"center"}>Name</Th>
                            <Th textAlign={"center"}>Author</Th>
                            <Th textAlign={"center"}>Submitted By</Th>
                            <Th textAlign={"center"}>Reccomendation Type</Th>
                            <Th textAlign={"center"}>Link</Th>
                            <Th textAlign={"center"}>Likes</Th>
                            <Th textAlign={"center"}>Dislikes</Th>
                            <Th textAlign={"center"}>Date Added</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {resourcesSortedByDate.map((resource) => (
                            <Tr
                                textAlign={"left"}
                                key={resource.resource_id}
                                onClick={() => {
                                    setSelectedResource(resource);
                                }}
                            >
                                <Td textAlign={"left"}>{resource.name}</Td>
                                <Td textAlign={"left"}>{resource.author}</Td>
                                <Td textAlign={"left"}>
                                    {usernames[resource.user_id]}
                                </Td>
                                <Td
                                    textAlign={"left"}
                                    textTransform={"capitalize"}
                                >
                                    {resource.recommendation_type}
                                </Td>
                                <Td textAlign={"left"}>
                                    <Tooltip label={resource.url}>
                                        <a href={resource.url} target="blank">
                                            <IconButton
                                                colorScheme="blue"
                                                aria-label="Search database"
                                                icon={<ExternalLinkIcon />}
                                            />
                                        </a>
                                    </Tooltip>
                                </Td>
                                <Td
                                    justifyContent={"left"}
                                    textAlign={"left"}
                                    alignItems={"center"}
                                >
                                    <IconButton
                                        variant={"ghost"}
                                        colorScheme="green"
                                        aria-label="add-like"
                                        icon={<ArrowUpIcon />}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleLike(
                                                resource.resource_id,
                                                setResources,
                                                setFavourites,
                                                activeUser.user_id
                                            );
                                        }}
                                    />
                                    {resource.likes}{" "}
                                </Td>
                                <Td
                                    justifyContent={"left"}
                                    textAlign={"left"}
                                    alignItems={"center"}
                                >
                                    <IconButton
                                        variant={"ghost"}
                                        colorScheme="red"
                                        aria-label="add-like"
                                        icon={<ArrowDownIcon />}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDislike(
                                                resource.resource_id,
                                                setResources,
                                                setFavourites,
                                                activeUser.user_id
                                            );
                                        }}
                                    />
                                    {resource.dislikes}
                                </Td>
                                <Td textAlign={"left"}>
                                    {moment(resource.creation_date).format(
                                        "DD/MM/yyyy"
                                    )}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}
        </>
    );
};
