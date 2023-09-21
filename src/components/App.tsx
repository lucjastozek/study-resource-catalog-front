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
import { Routes } from "./Routes";
import useCustomToast from "./useCustomToast";
import { fetchComments } from "../utils/fetchComments";
import { Comment } from "../interface/Comment";

function App() {
    const [listedUsers, setListedUsers] = useState<User[]>([]);
    const [activeUser, setActiveUser] = useState<User>(
        JSON.parse(localUser ?? initialUser)
    );
    const [resources, setResources] = useState<Resource[]>([]);
    const [favourites, setFavourites] = useState<Resource[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [usernames, setUsernames] = useState<Usernames>({});
    const [linkPreviews, setLinkPreviews] = useState<LinkPreviews>({});
    const [resourceTags, setResourceTags] = useState<TagI[]>([]);
    const [userImage, setUserImage] = useState("https://bit.ly/broken-link");

    const showToast = useCustomToast();

    useEffect(() => {
        fetchUsers().then((users) => setListedUsers(users));
        fetchResources().then((res) => setResources(res));
        fetchTags().then((t) => setResourceTags(t));
        fetchComments().then((c) => setComments(c));
    }, []);

    useEffect(() => {
        const socket = io(baseUrl);
        socket.connect();

        socket.on("resource", (received) => {
            fetchResources().then((res) => setResources(res));
            showToast(
                "info",
                `User ${
                    usernames[received.user_id]
                } just submitted the following resource: ${received.name}`,
                "top-left"
            );
        });

        socket.on("user", (received) => {
            fetchUsers().then((users) => setListedUsers(users));
            showToast(
                "success",
                `Welcome our new user - ${received.name}!`,
                "top-left"
            );
        });

        socket.on("comment", (received: Comment) => {
            fetchComments().then((c) => setComments(c));

            const user = usernames[received.user_id];
            showToast(
                "info",
                `
                ${user} just commented on '${
                    resources.find(
                        (r) => r.resource_id === received.resource_id
                    )?.name
                }':                                                                                                   
              "${received.text}"`,
                "top-left"
            );
        });

        function cleanup() {
            socket.disconnect();
        }

        return cleanup;
    }, [showToast, resources, usernames]);

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

        activeUser.user_id < 52
            ? setUserImage(`./${activeUser.name}-avatar.png`)
            : setUserImage("");
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
                        activeUser={activeUser}
                        comments={comments}
                        setFavourites={setFavourites}
                        setResources={setResources}
                        setActiveUser={setActiveUser}
                        setComments={setComments}
                    />
                </Router>
                <Footer />
            </VStack>
        </div>
    );
}

export default App;
