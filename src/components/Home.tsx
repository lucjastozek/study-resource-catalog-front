import { Heading } from "@chakra-ui/react";
import { TopFiveResources } from "./TopFiveResources";

export const Home = (): JSX.Element => (
    <>
        <Heading>This is the Homepage</Heading>

        <TopFiveResources />
    </>
);
