import { TabPanel, Heading, Select } from "@chakra-ui/react";
import { User } from "../interface/User";

interface SignInProps {
    setActiveUser: React.Dispatch<React.SetStateAction<User>>;
    listedUsers: User[];
}

export function SignIn({
    setActiveUser,
    listedUsers,
}: SignInProps): JSX.Element {
    return (
        <TabPanel w={{ base: "100%", lg: "50vw" }} marginBottom={"50vh"}>
            <Heading>Sign in!</Heading>
            <Select
                placeholder="Select a user"
                onChange={(e) =>
                    setActiveUser(listedUsers[Number(e.target.value)])
                }
                id="user-selector"
            >
                {listedUsers
                    .sort((a, b) => (b.name > a.name ? -1 : 1))
                    .map((user, index) => (
                        <option key={user.user_id} value={index}>
                            {user.name}
                        </option>
                    ))}
            </Select>
        </TabPanel>
    );
}
