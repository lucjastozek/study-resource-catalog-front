import {
    Alert,
    AlertIcon,
    Avatar,
    AvatarBadge,
    Box,
    Button,
    Container,
    Flex,
    Grid,
    HStack,
    Heading,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    Text,
    VStack,
    useColorMode,
    useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Resource } from "../interface/Resource";
import { TagI } from "../interface/Tag";
import { User } from "../interface/User";
import { fetchFavourites } from "../utils/fetchFavourites";
import { fetchImage } from "../utils/fetchImage";
import { fetchResources } from "../utils/fetchResources";
import { fetchTags } from "../utils/fetchTags";
import { fetchUserName } from "../utils/fetchUserName";
import { fetchUsers } from "../utils/fetchUsers";
import { AboutUs } from "./AboutUs";
import "./App.css";
import { Footer } from "./Footer";
import { Home } from "./Home";
import { SubmitResource } from "./SubmitResource";
import { ToStudy } from "./ToStudy";
import { UserLogin } from "./UserLogin";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function App() {
    const initialUser = JSON.stringify({
        user_name: "",
        user_id: 0,
        is_faculty: false,
    });

    const localUser = localStorage.getItem("activeUser");

    const { colorMode, toggleColorMode } = useColorMode();
    const [listedUsers, setListedUsers] = useState<User[]>([]);
    const [activeUser, setActiveUser] = useState<User>(
        JSON.parse(localUser ?? initialUser)
    );
    const [resources, setResources] = useState<Resource[]>([]);
    const [favourites, setFavourites] = useState<Resource[]>([]);
    const [selectedResource, setSelectedResource] = useState<Resource>();
    const [usernames, setUsernames] = useState<{ [key: number]: string }>({});
    const [linkPreviews, setLinkPreviews] = useState<{ [key: number]: string }>(
        {}
    );
    const [resourceTags, setResourceTags] = useState<TagI[]>([]);
    const [isLargeScreen] = useMediaQuery("(min-width: 992px)");

    const userImage =
        //Only the testing users will have images sine we are not go to implement the profile image loading feature.
        activeUser.user_id < 52
            ? `./${activeUser.name}-avatar.png`
            : "https://bit.ly/broken-link";

    useEffect(() => {
        fetchUsers().then((users) => setListedUsers(users));
        fetchResources().then((res) => setResources(res));
        fetchTags().then((t) => setResourceTags(t));
    }, []);

    useEffect(() => {
        for (const r of resources) {
            fetchUserName(r.user_id).then((name) => {
                setUsernames((prev) => ({ ...prev, ...{ [r.user_id]: name } }));
            });

            fetchImage(r.url).then((img) => {
                setLinkPreviews((prev) => ({
                    ...prev,
                    ...{ [r.resource_id]: img },
                }));
            });
        }
    }, [resources]);

    useEffect(() => {
        if (!localUser) {
            localStorage.setItem("activeUser", initialUser);
        }
        localStorage.setItem("activeUser", JSON.stringify(activeUser));

        if (activeUser.user_id > 0) {
            fetchFavourites(activeUser.user_id).then((fav) =>
                setFavourites(fav)
            );
        }
    }, [localUser, initialUser, activeUser]);

    return (
        <div className="App">
            <Flex direction={"column"}>
                <header>
                    <Flex
                        justify={"space-around"}
                        alignItems={"center"}
                        paddingTop={"2vh"}
                        flexDirection={{ base: "column", lg: "row" }}
                    >
                        <Grid
                            templateAreas={
                                isLargeScreen
                                    ? `"empty heading avatar"`
                                    : `"heading heading avatar"`
                            }
                            width={"100vw"}
                        >
                            {isLargeScreen && (
                                <Text gridArea={"empty"} width={"20vw"}></Text>
                            )}

                            <Heading
                                gridArea={"heading"}
                                textAlign={"center"}
                                mb={5}
                                mt={5}
                                fontSize={{ base: "1.5rem", lg: "3rem" }}
                                margin={"auto"}
                            >
                                Study Resources Catalog
                            </Heading>

                            <Popover>
                                <Box
                                    gridArea={"avatar"}
                                    width={"20vw"}
                                    marginLeft={"auto"}
                                >
                                    <PopoverTrigger>
                                        <Box textAlign="center" mb={"4"}>
                                            <Avatar
                                                src={userImage}
                                                // src="https://bit.ly/broken-link"
                                                name={activeUser?.name}
                                            >
                                                {activeUser.user_id > 0 && (
                                                    <AvatarBadge
                                                        boxSize="1.25em"
                                                        bg="green.500"
                                                    />
                                                )}
                                            </Avatar>

                                            {userImage !==
                                                "./undefined-avatar.png" && (
                                                <Text mt={2}>
                                                    {activeUser?.name}
                                                </Text>
                                            )}
                                            {userImage ===
                                                "./undefined-avatar.png" && (
                                                <Text mt={2}>
                                                    Login to submit{" "}
                                                    {activeUser?.name}{" "}
                                                </Text>
                                            )}
                                        </Box>
                                    </PopoverTrigger>
                                </Box>

                                <Portal>
                                    {userImage !== "./undefined-avatar.png" && (
                                        <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverHeader>
                                                Do you want to sign out?
                                            </PopoverHeader>
                                            <PopoverCloseButton />
                                            <PopoverBody>
                                                <Button
                                                    colorScheme="blue"
                                                    onClick={() =>
                                                        setActiveUser(
                                                            JSON.parse(
                                                                initialUser
                                                            )
                                                        )
                                                    }
                                                >
                                                    <a href="/users">
                                                        Sign Out
                                                    </a>
                                                </Button>
                                            </PopoverBody>
                                        </PopoverContent>
                                    )}
                                    {userImage === "./undefined-avatar.png" && (
                                        <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverHeader>
                                                Do you want to sign in?
                                            </PopoverHeader>
                                            <PopoverCloseButton />
                                            <PopoverBody>
                                                <Button
                                                    colorScheme="blue"
                                                    onClick={() =>
                                                        setActiveUser(
                                                            JSON.parse(
                                                                initialUser
                                                            )
                                                        )
                                                    }
                                                >
                                                    <a href="/users">Sign in</a>
                                                </Button>
                                            </PopoverBody>
                                        </PopoverContent>
                                    )}
                                </Portal>
                            </Popover>
                        </Grid>
                    </Flex>
                </header>

                <Router>
                    <VStack>
                        <nav>
                            <HStack
                                justifyContent={"center"}
                                wrap={{ base: "wrap", lg: "nowrap" }}
                            >
                                <Link to="/home">
                                    <Button size={{ base: "sm", lg: "md" }}>
                                        Home
                                    </Button>
                                </Link>

                                <Link to="/study">
                                    <Button size={{ base: "sm", lg: "md" }}>
                                        Your Study Resources
                                    </Button>
                                </Link>

                                <Link to="/users">
                                    <Button size={{ base: "sm", lg: "md" }}>
                                        Users
                                    </Button>
                                </Link>

                                <Link to="/submit">
                                    {" "}
                                    <Button size={{ base: "sm", lg: "md" }}>
                                        Submit New
                                    </Button>
                                </Link>

                                <Link to="/info">
                                    {" "}
                                    <Button size={{ base: "sm", lg: "md" }}>
                                        About Us
                                    </Button>
                                </Link>
                                <IconButton
                                    icon={
                                        colorMode === "light" ? (
                                            <MoonIcon />
                                        ) : (
                                            <SunIcon />
                                        )
                                    }
                                    onClick={toggleColorMode}
                                    size={{ base: "sm", lg: "md" }}
                                    aria-label="toggle color mode button"
                                />
                            </HStack>
                        </nav>
                        <Switch>
                            <Route exact path="/">
                                <Home
                                    resources={resources}
                                    setResources={setResources}
                                    selectedResource={selectedResource}
                                    setSelectedResource={setSelectedResource}
                                    usernames={usernames}
                                    linkPreviews={linkPreviews}
                                    activeUser={activeUser}
                                    setFavourites={setFavourites}
                                    resourceTags={resourceTags}
                                />
                            </Route>
                            <Route path="/home">
                                <Home
                                    resources={resources}
                                    setResources={setResources}
                                    selectedResource={selectedResource}
                                    setSelectedResource={setSelectedResource}
                                    usernames={usernames}
                                    linkPreviews={linkPreviews}
                                    activeUser={activeUser}
                                    setFavourites={setFavourites}
                                    resourceTags={resourceTags}
                                />
                            </Route>
                            <Route path="/users">
                                <UserLogin
                                    listedUsers={listedUsers}
                                    setActiveUser={setActiveUser}
                                />
                            </Route>
                            <Route path="/study">
                                <ToStudy
                                    favourites={favourites}
                                    setSelectedResource={setSelectedResource}
                                    usernames={usernames}
                                    linkPreviews={linkPreviews}
                                    setResources={setResources}
                                    selectedResource={selectedResource}
                                    activeUser={activeUser}
                                    setFavourites={setFavourites}
                                    resourceTags={resourceTags}
                                />
                            </Route>
                            <Route path="/submit">
                                {activeUser.user_id > 0 ? (
                                    <SubmitResource
                                        activeUser={activeUser}
                                        setResources={setResources}
                                    />
                                ) : (
                                    <>
                                        {" "}
                                        <Container>
                                            <Alert status="warning">
                                                <AlertIcon />
                                                You must login before you can
                                                submit a new resource!
                                            </Alert>{" "}
                                        </Container>
                                        <UserLogin
                                            listedUsers={listedUsers}
                                            setActiveUser={setActiveUser}
                                        />{" "}
                                    </>
                                )}
                            </Route>
                            <Route path="/info">
                                <AboutUs />
                            </Route>
                        </Switch>
                    </VStack>
                </Router>
                <Footer />
            </Flex>
        </div>
    );
}

export default App;
