import {
    Button,
    Checkbox,
    Heading,
    Input,
    Select,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { User } from "../interface/User";

interface UserLoginProps {
    setActiveUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    listedUsers: User[];
}

export function UserLogin({
    setActiveUser,
    listedUsers,
}: UserLoginProps): JSX.Element {
    const [nameInput, setNameInput] = useState<string>();
    const [isFaculty, setIsFaculty] = useState<boolean>(false);

    const handleNameInput = (nameValue: string) => {
        setNameInput(nameValue);
    };

    const handleSubmitName = async () => {
        const response = await axios.post(`${baseUrl}/users`, {
            user_name: nameInput,
            is_faculty: isFaculty,
        });

        console.log(response.data);

        setActiveUser(response.data[0]);
        setNameInput("");
        setIsFaculty(false);
    };

    return (
        <>
            <Tabs variant="soft-rounded" colorScheme="green">
                <TabList>
                    <Tab>Sign In</Tab>
                    <Tab>Sign Up</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Heading>This is the login page</Heading>
                        <Select
                            placeholder="Select a user"
                            onChange={(e) =>
                                setActiveUser(
                                    listedUsers[Number(e.target.value)]
                                )
                            }
                        >
                            {listedUsers.map((user, index) => (
                                <option key={user.user_id} value={index}>
                                    {user.name}
                                </option>
                            ))}
                        </Select>
                    </TabPanel>
                    <TabPanel>
                        <Heading>This is the register page</Heading>

                        <Input
                            value={nameInput}
                            onChange={(e) => handleNameInput(e.target.value)}
                        ></Input>
                        <Checkbox
                            onChange={() => setIsFaculty((prev) => !prev)}
                        >
                            Faculty Member
                        </Checkbox>

                        <Button onClick={handleSubmitName}>Sign up</Button>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
}
