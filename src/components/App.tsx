import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { io } from "socket.io-client";
import { baseUrl } from "../baseUrl";
import { LinkPreviews } from "../interface/LinkPreviews";
import { Resource } from "../interface/Resource";
import { TagI } from "../interface/Tag";
import { User } from "../interface/User";
import { Usernames } from "../interface/Usernames";
import { fetchFavourites } from "../utils/fetchFavourites";
import { fetchImage } from "../utils/fetchImage";
import { fetchResources } from "../utils/fetchResources";
import { fetchTags } from "../utils/fetchTags";
import { fetchUserName } from "../utils/fetchUserName";
import { fetchUsers } from "../utils/fetchUsers";
import { initialUser } from "../utils/initialUser";
import { localUser } from "../utils/localUser";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Navigation } from "./Navigation";
import Routes from "./Routes";
import useCustomToast from "./useCustomToast";

function App() {
    const [listedUsers, setListedUsers] = useState<User[]>([]);
    const [activeUser, setActiveUser] = useState<User>(
        JSON.parse(localUser ?? initialUser)
    );
    const [resources, setResources] = useState<Resource[]>([]);
    const [favourites, setFavourites] = useState<Resource[]>([]);
    const [usernames, setUsernames] = useState<Usernames>({});
    const [linkPreviews, setLinkPreviews] = useState<LinkPreviews>({});
    const [resourceTags, setResourceTags] = useState<TagI[]>([]);

    const showToast = useCustomToast();

    const userImage =
        //Only the testing users will have images since we are not going to implement the profile image loading feature.
        activeUser.user_id < 52
            ? `./${activeUser.name}-avatar.png`
            : "https://bit.ly/broken-link";

    useEffect(() => {
        fetchUsers().then((users) => setListedUsers(users));
        fetchResources().then((res) => setResources(res));
        fetchTags().then((t) => setResourceTags(t));
    }, []);

    useEffect(() => {
        const socket = io(baseUrl);

        socket.connect();

        socket.on("resource", (received) => {
            fetchResources().then((res) => setResources(res));
            showToast(
                "info",
                `CHECK OUT THIS SICK NEW RESOURCE: ${received.name}`,
                "top-left"
            );
        });

        socket.on("user", (received) => {
            fetchUsers().then((users) => setListedUsers(users));
            showToast(
                "success",
                `Welcome our new user - ${received.name}!!!`,
                "top-left"
            );
        });

        function cleanup() {
            socket.disconnect();
        }

        return cleanup;
    }, [showToast]);

    useEffect(() => {
        for (const r of resources) {
            fetchUserName(r.user_id)
                .then((name) => {
                    setUsernames((prev) => ({ ...prev, [r.user_id]: name }));
                })
                .catch((error) => {
                    console.error(
                        `Error fetching username for user_id ${r.user_id}: ${error}`
                    );
                });

            fetchImage(r.url)
                .then((img) => {
                    setLinkPreviews((prev) => ({
                        ...prev,
                        [r.resource_id]: img,
                    }));
                })
                .catch((error) => {
                    console.error(
                        `Error fetching image for resource_id ${r.resource_id}: ${error}`
                    );
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
    }, [activeUser]);

    return (
        <div className="App">
            <VStack>
                <Header
                    userImage={userImage}
                    activeUser={activeUser}
                    setActiveUser={setActiveUser}
                />

                <Router>
                    <Navigation />
                    <Routes
                        listedUsers={listedUsers}
                        favourites={favourites}
                        usernames={usernames}
                        linkPreviews={linkPreviews}
                        resourceTags={resourceTags}
                        resources={resources}
                        setResources={setResources}
                        activeUser={activeUser}
                        setFavourites={setFavourites}
                        setActiveUser={setActiveUser}
                    />
                </Router>
                <Footer />
            </VStack>
        </div>
    );
}

export default App;
