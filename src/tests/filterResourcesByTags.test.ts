import { Resource } from "../interface/Resource";
import { TagI } from "../interface/Tag";
import { filterResourcesByTags } from "../utils/filterResourcesByTags";

//This is an example of a Resource array that can be used for testing
const exampleResources: Resource[] = [
    {
        resource_id: 42,
        name: "Stack Overflow",
        url: "https://stackoverflow.com/",
        description:
            "Website for community questions about tech/coding - it serves 100 million people every month",
        content_type: "forum",
        stage: 1,
        creation_date: "2023-09-19T14:28:08.413Z",
        user_id: 1,
        recommendation_type: "recommend",
        reason: "Helpful for any level of software engineer",
        likes: 13,
        dislikes: 0,
        author: "Stack Exchange Inc",
    },
    {
        resource_id: 28,
        name: "iOS App Dev Tutorials",
        url: "https://developer.apple.com/tutorials/app-dev-training/",
        description:
            "Start building apps with SwiftUI, a declarative framework that developers use to compose the layout and behavior of multiplatform apps. You’ll build Scrumdinger, an app that manages daily meetings.",
        content_type: "article",
        stage: 1,
        creation_date: "2023-09-17T08:07:44.959Z",
        user_id: 51,
        recommendation_type: "recommend",
        reason: "It's cool!",
        likes: 8,
        dislikes: 0,
        author: "Apple Dev",
    },
    {
        resource_id: 20,
        name: "Inspecting Netflix Frontend",
        url: "https://www.youtube.com/watch?v=MxFt3YsjyQg&list=PLQnljOFTspQX9U79P6eD_V9USIUTE9yAD",
        description:
            "Netflix is a very popular video streaming website. In today’s episode we devtool this website and look at the requests, protocols, and architecture used to stream this content. I like the way Netflix’s backend empowers a great frontend. ",
        content_type: "video",
        stage: 1,
        creation_date: "2023-09-14T22:39:16.807Z",
        user_id: 49,
        recommendation_type: "recommend",
        reason: "That guy is a genius.",
        likes: 21,
        dislikes: 1,
        author: "Hussein Nasser",
    },
    {
        resource_id: 18,
        name: "Link Preview API",
        url: "https://www.youtube.com/watch?v=CC5Wm3_ZGUg",
        description:
            "Good option if you want to get the preview image of a link. The bad thing about it is that you need to authenticate.",
        content_type: "video",
        stage: 1,
        creation_date: "2023-09-14T22:29:35.829Z",
        user_id: 48,
        recommendation_type: "disrecommend",
        reason: "Because it's fun.",
        likes: 8,
        dislikes: 10,
        author: "Prateek Shourya",
    },
];

const exampleTags: TagI[] = [
    {
        tag_id: 4,
        resource_id: 20,
        name: "Front-end",
    },
    {
        tag_id: 18,
        resource_id: 28,
        name: "React",
    },
    {
        tag_id: 30,
        resource_id: 42,
        name: "Other",
    },
    {
        tag_id: 1,
        resource_id: 18,
        name: "JavaScript",
    },
    {
        tag_id: 2,
        resource_id: 18,
        name: "API",
    },
];

test("filterResourcesByTags should take a list of resources and filter them by an array of the user's selected tags", () => {
    expect(
        filterResourcesByTags(exampleResources, ["React"], exampleTags)
    ).toEqual([exampleResources[1]]);
    expect(
        filterResourcesByTags(
            exampleResources,
            ["API", "Javascript"],
            exampleTags
        )
    ).toEqual([exampleResources[3]]);
});

test("filterResourcesByTags should return all resources if no tags are selected", () => {
    expect(filterResourcesByTags(exampleResources, [], exampleTags)).toEqual(
        exampleResources
    );
});
