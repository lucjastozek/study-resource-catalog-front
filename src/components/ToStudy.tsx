import { Grid, Heading, Input, useColorMode } from "@chakra-ui/react";
import { Resource } from "../interface/Resource";
import { ResourceCard } from "./ResourceCard";
import moment from "moment";
import { ResourceDetail } from "./ResourceDetail";
import { tagScheme } from "../utils/tagScheme";
import { User } from "../interface/User";
import { filterContent } from "../utils/filterContent";
import { useState } from "react";

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
}: ToStudyProps): JSX.Element => {
    const [searchInput, setSearchInput] = useState<string>("");
    const filteredFavourites = filterContent(
        favourites,
        usernames,
        searchInput
    );

    const { colorMode } = useColorMode();
    const placeholderColor = colorMode === "dark" ? "white" : "black";

    return (
        <>
            <Heading>Your favourites</Heading>

            <Input
                onChange={(e) => setSearchInput(e.target.value)}
                width={"20vw"}
                value={searchInput}
                placeholder="Filter favourites..."
                _placeholder={{ color: placeholderColor }}
            ></Input>
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
            <Grid
                templateColumns={{
                    base: `repeat(${Math.ceil(favourites.length / 5)}, 1fr)`,
                    md: "repeat(5, 1fr)",
                }}
                templateRows={{
                    base: "repeat(5, 1fr)",
                    md: `repeat(${Math.ceil(favourites.length / 5)}, 1fr)`,
                }}
                gap={4}
                margin={4}
            >
                {filteredFavourites
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
                            setFavourites={setFavourites}
                            activeUser={activeUser}
                        />
                    ))}
            </Grid>
        </>
    );
};
