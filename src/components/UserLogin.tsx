import { Button, Heading, Input } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../baseUrl";

export function UserLogin(): JSX.Element {
    const [nameInput, setNameInput] = useState<string>();

    const handleNameInput = (nameValue: string) => {
        setNameInput(nameValue);
    };

    const handleSubmitName = async () => {
        await axios.post(`${baseUrl}/users`);
    };

    return (
        <>
            <Heading>This is the login page</Heading>

            <Input
                value={nameInput}
                onChange={(e) => handleNameInput(e.target.value)}
            ></Input>

            <Button onClick={handleSubmitName}></Button>
        </>
    );
}
