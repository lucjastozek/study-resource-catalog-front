import {
    Button,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    Stack,
    Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../baseUrl";
import { contentTypes } from "../utils/contentTypes";
import { formatContentType } from "../utils/formatContentType";
import { User } from "../interface/User";
import { z } from "zod";
import { SubmitForm } from "../interface/submitForm";

interface SubmitResourceProps {
    activeUser?: User;
}

export const SubmitResource = ({
    activeUser,
}: SubmitResourceProps): JSX.Element => {
    const [formValues, setFormValues] = useState<SubmitForm>({} as SubmitForm);

    const formSchema = z.object({
        author_name: z
            .string()
            .min(1, "You need to input an author")
            .max(255, "Author name exceeds maximum characters of 250"),
        resource_name: z
            .string()
            .min(1, "You need to input an resource name")
            .max(250, "resource name exceeds maximum characters of 250"),
        description: z
            .string()
            .min(1, "You need to input a description")
            .max(250, "Your description exceeds maximum characters of 250"),
        url: z
            .string()
            .url("Submitted url is invalid")
            .min(1, "You need to input a url")
            .max(250, "Your description exceeds maximum characters of 250"),
        buildWeek: z
            .number()
            .min(1, "You must input a build week number")
            .max(15, "Your build week number exceeds the maximum week"),
        recommend: z.enum(["recommend", "promising", "disrecommend"]),
        reason: z
            .string()
            .min(1, "You need to input a reason for recommending")
            .max(250, "Your reason exceeds maximum characters of 250"),
        user_id: z.number().min(1),
    });

    const handleSubmit = async () => {
        if (activeUser) {
            const userid = { user_id: activeUser.user_id };
            formSchema.parse(formValues);
            setFormValues((prev) => ({ ...prev, ...userid }));
            await axios.post(baseUrl + "/resources", formValues);
            setFormValues({} as SubmitForm);
        }
    };

    const handleRecommend = (
        recommendation: "recommend" | "promising" | "disrecommend"
    ) => {
        const recommendValue = { recommend: recommendation };
        setFormValues((prev) => ({ ...prev, ...recommendValue }));
    };

    return (
        <>
            <Heading>Submit New Resource</Heading>

            <Stack justifyContent={"center"}>
                <Input
                    value={formValues?.resource_name}
                    placeholder="Resource Name"
                ></Input>
                <Input
                    value={formValues?.author_name}
                    placeholder="Author"
                ></Input>

                <InputGroup>
                    <InputLeftAddon textAlign={"center"}>
                        https://{" "}
                    </InputLeftAddon>
                    <Input value={formValues?.url} placeholder="URL"></Input>
                </InputGroup>
                <Textarea
                    value={formValues?.description}
                    placeholder="Description"
                ></Textarea>

                <InputGroup>
                    <InputLeftAddon w={"9rem"}> Content Type</InputLeftAddon>
                    <Select>
                        {contentTypes.map((type) => (
                            <option key={type} value={type}>
                                {formatContentType(type)}
                            </option>
                        ))}
                    </Select>
                </InputGroup>

                <InputGroup>
                    <InputLeftAddon w={"9rem"}>Build Week </InputLeftAddon>

                    <NumberInput
                        value={formValues?.buildWeek}
                        defaultValue={1}
                        min={1}
                        max={15}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </InputGroup>

                <Button
                    onClick={() => handleRecommend("recommend")}
                    colorScheme="green"
                >
                    Recommend
                </Button>

                <Button
                    onClick={() => handleRecommend("promising")}
                    colorScheme="blue"
                >
                    Looks promising
                </Button>

                <Button
                    onClick={() => handleRecommend("disrecommend")}
                    colorScheme="red"
                >
                    Anti-recommend
                </Button>

                <Textarea
                    value={formValues?.reason}
                    placeholder="Reason for (anti)recommendation"
                ></Textarea>
                <Button onClick={handleSubmit}> Submit</Button>
            </Stack>
        </>
    );
};
