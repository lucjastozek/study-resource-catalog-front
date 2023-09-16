import { Resource } from "../interface/Resource";

export const filterContent = (
    resources: Resource[],
    usernames: {
        [key: number]: string;
    },
    searchInput: string
) => {
    const searchInputLowerCase = searchInput.toLocaleLowerCase();
    const filteredContent = resources.filter(
        (resource) =>
            resource.description
                .toLocaleLowerCase()
                .includes(searchInputLowerCase) ||
            resource.name.toLocaleLowerCase().includes(searchInputLowerCase) ||
            resource.author
                .toLocaleLowerCase()
                .includes(searchInputLowerCase) ||
            usernames[resource.user_id]
                .toLocaleLowerCase()
                .includes(searchInputLowerCase)
    );

    return filteredContent;
};
