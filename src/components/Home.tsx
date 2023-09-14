import { Heading } from "@chakra-ui/react";
import { TopFiveResources } from "./TopFiveResources";
import { Resource } from "../interface/Resource";

interface HomeProps {
    resources: Resource[];
}

export const Home = ({ resources }: HomeProps): JSX.Element => (
    <>
        <Heading>This is the Homepage</Heading>

        <TopFiveResources resources={resources} />
    </>
);
