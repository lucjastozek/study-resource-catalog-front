import { Alert, AlertIcon, Container } from "@chakra-ui/react";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { LinkPreviews } from "../interface/LinkPreviews";
import { Resource } from "../interface/Resource";
import { TagI } from "../interface/Tag";
import { User } from "../interface/User";
import { Usernames } from "../interface/Usernames";
import { AboutUs } from "./AboutUs";
import { Home } from "./Home";
import { SubmitResource } from "./SubmitResource";
import { ToStudy } from "./ToStudy";
import { UserLogin } from "./UserLogin";

interface RoutesProps {
    listedUsers: User[];
    favourites: Resource[];
    setFavourites: React.Dispatch<React.SetStateAction<Resource[]>>;
    usernames: Usernames;
    linkPreviews: LinkPreviews;
    resourceTags: TagI[];
    resources: Resource[];
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
    activeUser: User;
    setActiveUser: React.Dispatch<React.SetStateAction<User>>;
}

export function Routes({
    listedUsers,
    favourites,
    usernames,
    linkPreviews,
    resourceTags,
    resources,
    setResources,
    activeUser,
    setFavourites,
    setActiveUser,
}: RoutesProps): JSX.Element {
    const [selectedResource, setSelectedResource] = useState<Resource>();

    return (
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
            <Route path="/submit-new">
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
                                You must login before you can submit a new
                                resource!
                            </Alert>{" "}
                        </Container>
                        <UserLogin
                            listedUsers={listedUsers}
                            setActiveUser={setActiveUser}
                        />{" "}
                    </>
                )}
            </Route>
            <Route path="/about-us">
                <AboutUs />
            </Route>
        </Switch>
    );
}
