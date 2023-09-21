import { Alert, AlertIcon, Container } from "@chakra-ui/react";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Comment } from "../interface/Comment";
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
    usernames: Usernames;
    linkPreviews: LinkPreviews;
    resourceTags: TagI[];
    resources: Resource[];
    activeUser: User;
    comments: Comment[];
    setActiveUser: React.Dispatch<React.SetStateAction<User>>;
    setFavourites: React.Dispatch<React.SetStateAction<Resource[]>>;
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export function Routes({
    listedUsers,
    favourites,
    usernames,
    linkPreviews,
    resourceTags,
    resources,
    activeUser,
    comments,
    setComments,
    setResources,
    setFavourites,
    setActiveUser,
}: RoutesProps): JSX.Element {
    const [selectedResource, setSelectedResource] = useState<Resource>();

    return (
        <Switch>
            <Route exact path="/">
                <Home
                    resources={resources}
                    selectedResource={selectedResource}
                    usernames={usernames}
                    linkPreviews={linkPreviews}
                    activeUser={activeUser}
                    comments={comments}
                    resourceTags={resourceTags}
                    setResources={setResources}
                    setSelectedResource={setSelectedResource}
                    setComments={setComments}
                    setFavourites={setFavourites}
                />
            </Route>
            <Route path="/home">
                <Home
                    resources={resources}
                    selectedResource={selectedResource}
                    usernames={usernames}
                    linkPreviews={linkPreviews}
                    activeUser={activeUser}
                    resourceTags={resourceTags}
                    comments={comments}
                    setComments={setComments}
                    setFavourites={setFavourites}
                    setResources={setResources}
                    setSelectedResource={setSelectedResource}
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
                    usernames={usernames}
                    linkPreviews={linkPreviews}
                    selectedResource={selectedResource}
                    activeUser={activeUser}
                    resourceTags={resourceTags}
                    comments={comments}
                    setComments={setComments}
                    setResources={setResources}
                    setFavourites={setFavourites}
                    setSelectedResource={setSelectedResource}
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
