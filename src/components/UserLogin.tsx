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
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { User } from "../interface/User";
import { z } from "zod";

interface UserLoginProps {
    setActiveUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    listedUsers: User[];
}

const userSchema = z.object({
    user_name: z
        .string()
        .min(1, "username has to be at least 1 character long")
        .max(50, "username has to be maximum 50 characters long"),
    is_faculty: z.boolean(),
});

export function UserLogin({
    setActiveUser,
    listedUsers,
}: UserLoginProps): JSX.Element {
    const [nameInput, setNameInput] = useState<string>("");
    const [isFaculty, setIsFaculty] = useState<boolean>(false);
    const toast = useToast();

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
            toast({
                position: "top",
                title: "Account created!",
                description: "The user has been successfully created!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                error.errors.forEach((err) => {
                    toast({
                        position: "top",
                        title: "Error!",
                        description: err.message,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                });
            } else {
                toast({
                    position: "top",
                    title: "Error!",
                    description: "Username has been already taken!",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
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
