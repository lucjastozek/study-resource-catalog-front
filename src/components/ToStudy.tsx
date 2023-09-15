import { Heading } from "@chakra-ui/react";
import { Resource } from "../interface/Resource";
import { ResourceCard } from "./ResourceCard";
import moment from "moment";
import { ResourceDetail } from "./ResourceDetail";
import { tagScheme } from "../utils/tagScheme";
import { User } from "../interface/User";

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
}: ToStudyProps): JSX.Element => (
    <>
        <Heading>Your favourites</Heading>
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
                activeUser={activeUser}
                setFavourites={setFavourites}
            />
        ) : (
            <></>
        )}
        {favourites
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
                />
            ))}
    </>
);
