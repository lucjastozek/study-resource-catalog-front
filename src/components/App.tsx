import {
    Alert,
    AlertIcon,
    Avatar,
    Button,
    Container,
    Flex,
    HStack,
    Heading,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    VStack,
    useColorMode,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { baseUrl } from "../baseUrl";
import { User } from "../interface/User";
import "./App.css";
import { Home } from "./Home";
import { SubmitResource } from "./SubmitResource";
import { ToStudy } from "./ToStudy";
import { UserLogin } from "./UserLogin";
import { Resource } from "../interface/Resource";

function App() {
    const { colorMode, toggleColorMode } = useColorMode();
    const [listedUsers, setListedUsers] = useState<User[]>([]);
    const [activeUser, setActiveUser] = useState<User>();
    const [resources, setResources] = useState<Resource[]>([]);

    useEffect(() => {
        async function fetchUsers(): Promise<User[]> {
            const response = await axios.get(baseUrl + "/users");
            return response.data;
        }

        async function fetchResources(): Promise<Resource[]> {
            const response = await axios.get(baseUrl + "/resources");
            return response.data;
        }

        fetchUsers().then((users) => setListedUsers(users));
        fetchResources().then((res) => setResources(res));
    }, []);

    return (
        <div className="App">
            <Flex direction={"column"} height={"100vh"}>
                <header>
                    <Flex
                        justify={"space-around"}
                        alignItems={"center"}
                        paddingTop={"2vh"}
                    >
                        <Button onClick={toggleColorMode}>
                            Toggle {colorMode === "light" ? "Dark" : "Light"}
                        </Button>
                        <Heading textAlign={"center"}>
                            Study Resources Catalog
                        </Heading>
                        <Popover>
                            <PopoverTrigger>
                                <Avatar
                                    src="https://bit.ly/broken-link"
                                    name={activeUser?.name}
                                />
                            </PopoverTrigger>
                            <Portal>
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
                                                setActiveUser(undefined)
                                            }
                                        >
                                            <a href="/users">Sign Out</a>
                                        </Button>
                                    </PopoverBody>
                                </PopoverContent>
                            </Portal>
                        </Popover>
                    </Flex>
                </header>

                <Router>
                    <VStack>
                        <nav>
                            <HStack>
                                <Button>
                                    <Link to="/home">Home</Link>
                                </Button>

                                <Button>
                                    <Link to="/study">
                                        Your Study Resources
                                    </Link>
                                </Button>

                                <Button>
                                    <Link to="/users">Users</Link>
                                </Button>

                                <Button>
                                    <Link to="/submit">Submit New</Link>
                                </Button>
                            </HStack>
                        </nav>

                        <Switch>
                            <Route path="/home">
                                <Home resources={resources} />
                            </Route>
                            <Route path="/users">
                                <UserLogin
                                    listedUsers={listedUsers}
                                    setActiveUser={setActiveUser}
                                />
                            </Route>
                            <Route path="/study">
                                <ToStudy />
                            </Route>
                            <Route path="/submit">
                                {activeUser ? (
                                    <SubmitResource activeUser={activeUser} />
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
                        </Switch>
                    </VStack>
                </Router>
            </Flex>
        </div>
    );
}

export default App;
