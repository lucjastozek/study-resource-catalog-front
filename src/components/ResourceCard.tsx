import { Card, CardBody, Text } from "@chakra-ui/react";
import { Resource } from "../interface/Resource";
import { TagI } from "../interface/Tag";
import { User } from "../interface/User";
import { ResourceCardFooter } from "./ResourceCardFooter";
import { ResourceCardHeader } from "./ResourceCardHeader";

interface ResourceCardProps {
    resource: Resource;
    setSelectedResource: React.Dispatch<
        React.SetStateAction<Resource | undefined>
    >;
    usernames: {
        [key: number]: string;
    };
    linkPreviews: { [key: number]: string };
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
    setFavourites: React.Dispatch<React.SetStateAction<Resource[]>>;
    activeUser: User;
    tags: TagI[];
}

export function ResourceCard({
    resource,
    setSelectedResource,
    usernames,
    linkPreviews,
    setResources,
    setFavourites,
    activeUser,
    tags,
}: ResourceCardProps): JSX.Element {
    return (
        <Card key={resource.resource_id}>
            <ResourceCardHeader
                resource={resource}
                setSelectedResource={setSelectedResource}
                usernames={usernames}
                linkPreviews={linkPreviews}
                tags={tags}
            />
            <CardBody
                marginLeft={2}
                marginRight={2}
                onClick={() => {
                    setSelectedResource(resource);
                }}
            >
                <Text noOfLines={4}>{resource.description}</Text>
            </CardBody>

            <ResourceCardFooter
                resource={resource}
                setResources={setResources}
                setFavourites={setFavourites}
                activeUser={activeUser}
            />
        </Card>
    );
}
