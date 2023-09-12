import "./App.css";
import {
    useColorMode,
    Button,
    Container,
    HStack,
    VStack,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { UserLogin } from "./UserLogin";
import { ToStudy } from "./ToStudy";
import { Home } from "./Home";
import { SubmitResource } from "./SubmitResource";

function App() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <div className="App">
            <header>
                <Button onClick={toggleColorMode}>
                    Toggle {colorMode === "light" ? "Dark" : "Light"}
                </Button>
            </header>

            <Container>
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
                                <Home />
                            </Route>
                            <Route path="/users">
                                <UserLogin />
                            </Route>
                            <Route path="/study">
                                <ToStudy />
                            </Route>
                            <Route path="/submit">
                                <SubmitResource />
                            </Route>
                        </Switch>
                    </VStack>
                </Router>
            </Container>
        </div>
    );
}

export default App;
