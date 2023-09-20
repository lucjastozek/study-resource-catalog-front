import {
    TabPanel,
    Flex,
    Heading,
    Input,
    Checkbox,
    Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { userSchema } from "../schemas/userSchema";
import { User } from "../interface/User";
import axios from "axios";
import { z } from "zod";
import { baseUrl } from "../baseUrl";
import useCustomToast from "./useCustomToast";

interface SignUpProps {
    setActiveUser: React.Dispatch<React.SetStateAction<User>>;
}

export function SignUp({ setActiveUser }: SignUpProps): JSX.Element {
    const [nameInput, setNameInput] = useState<string>("");
    const [isFaculty, setIsFaculty] = useState<boolean>(false);
    const showUserToast = useCustomToast();

    function handleNameInput(nameValue: string) {
        setNameInput(nameValue);
    }

    async function handleSubmitName() {
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
    }

    return (
        <TabPanel w={{ base: "100%", lg: "50vw" }} marginBottom={"50vh"}>
            <Flex direction={"column"}>
                <Heading>Create a new user!</Heading>

                <Input
                    value={nameInput}
                    onChange={(e) => handleNameInput(e.target.value)}
                    id="sign-up-input"
                />
                <Checkbox
                    size={"lg"}
                    isChecked={isFaculty}
                    onChange={(e) => setIsFaculty(e.target.checked)}
                >
                    Faculty Member
                </Checkbox>

                <Button onClick={handleSubmitName} marginTop={"2vh"}>
                    Sign up
                </Button>
            </Flex>
        </TabPanel>
    );
}
