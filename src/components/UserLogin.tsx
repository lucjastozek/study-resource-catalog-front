import { Tab, TabList, TabPanels, Tabs } from "@chakra-ui/react";
import { User } from "../interface/User";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

interface UserLoginProps {
    setActiveUser: React.Dispatch<React.SetStateAction<User>>;
    listedUsers: User[];
}

export function UserLogin({
    setActiveUser,
    listedUsers,
}: UserLoginProps): JSX.Element {
    return (
        <>
            <Tabs mt={"1rem"} variant="solid-rounded" colorScheme="teal">
                <TabList>
                    <Tab>Sign In</Tab>
                    <Tab>Sign Up</Tab>
                </TabList>
                <TabPanels>
                    <SignIn
                        setActiveUser={setActiveUser}
                        listedUsers={listedUsers}
                    />
                    <SignUp setActiveUser={setActiveUser} />
                </TabPanels>
            </Tabs>
        </>
    );
}
