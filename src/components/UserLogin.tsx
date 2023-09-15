import {
    Button,
    Checkbox,
    Flex,
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
import { z } from "zod";
import useCustomToast from "./useCustomToast";
import { userSchema } from "../schemas/userSchema";

interface UserLoginProps {
    setActiveUser: React.Dispatch<React.SetStateAction<User>>;
    listedUsers: User[];
}

export function UserLogin({
    setActiveUser,
    listedUsers,
}: UserLoginProps): JSX.Element {
    const [nameInput, setNameInput] = useState<string>("");
    const [isFaculty, setIsFaculty] = useState<boolean>(false);

    const showUserToast = useCustomToast();

    const handleNameInput = (nameValue: string) => {
        setNameInput(nameValue);
    };

    const handleSubmitName = async () => {
        const userToAdd = {
            user_name: nameInput,
            is_faculty: isFaculty,
        };
        try {
            userSchema.parse(userToAdd);
            const response = await axios.post(`${baseUrl}/users`, userToAdd);

            setActiveUser(response.data[0]);
            setNameInput("");
            setIsFaculty(false);
            showUserToast("success", "The user has been successfully created!");
        } catch (error) {
            if (error instanceof z.ZodError) {
                error.errors.forEach((err) => {
                    showUserToast("error", err.message);
                });
            } else {
                showUserToast("error", "Username has already been taken!");
            }
        }
    };

    return (
        <>
            <Tabs variant="solid-rounded" colorScheme="teal">
                <TabList>
                    <Tab>Sign In</Tab>
                    <Tab>Sign Up</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel width={"50vw"}>
                        <Heading>Sign in!</Heading>
                        <Select
                            placeholder="Select a user"
                            onChange={(e) =>
                                setActiveUser(
                                    listedUsers[Number(e.target.value)]
                                )
                            }
                            id="user-selector"
                        >
                            {listedUsers.map((user, index) => (
                                <option key={user.user_id} value={index}>
                                    {user.name}
                                </option>
                            ))}
                        </Select>
                    </TabPanel>
                    <TabPanel width={"50vw"}>
                        <Flex direction={"column"}>
                            <Heading>Create a new user!</Heading>

                            <Input
                                value={nameInput}
                                onChange={(e) =>
                                    handleNameInput(e.target.value)
                                }
                                id="sign-up-input"
                            />
                            <Checkbox
                                size={"lg"}
                                isChecked={isFaculty}
                                onChange={(e) => setIsFaculty(e.target.checked)}
                            >
                                Faculty Member
                            </Checkbox>

                            <Button
                                onClick={handleSubmitName}
                                marginTop={"2vh"}
                            >
                                Sign up
                            </Button>
                        </Flex>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
}
