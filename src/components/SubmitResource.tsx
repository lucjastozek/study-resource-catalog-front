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
    useColorMode,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../baseUrl";
import { contentTypes } from "../utils/contentTypes";
import { formatContentType } from "../utils/formatContentType";
import { User } from "../interface/User";
import { z } from "zod";
import { SubmitForm } from "../interface/submitForm";
import useCustomToast from "./useCustomToast";
import { formSchema } from "../schemas/formSchema";
import { Resource } from "../interface/Resource";
import { fetchResources } from "../utils/fetchResources";

interface SubmitResourceProps {
    activeUser?: User;
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
}

export const SubmitResource = ({
    activeUser,
    setResources,
}: SubmitResourceProps): JSX.Element => {
    const initialState: SubmitForm = {
        author_name: "",
        resource_name: "",
        description: "",
        url: "",
        recommendation_type: null,
        stage: 1,
        reason: "",
        user_id: activeUser?.user_id,
        content_type: "video",
    };
    const [formValues, setFormValues] = useState<SubmitForm>(initialState);
    const { colorMode } = useColorMode();

    const showFormToast = useCustomToast();
    const placeholderColor = colorMode === "dark" ? "white" : "black";

    const handleSubmit = async () => {
        if (activeUser) {
            try {
                const userid = { user_id: activeUser.user_id };
                setFormValues((prev) => ({ ...prev, ...userid }));
                formSchema.parse(formValues);
                await axios.post(baseUrl + "/resources", formValues);
                setFormValues(initialState);
                fetchResources().then((res) => setResources(res));
            } catch (error) {
                if (error instanceof z.ZodError) {
                    error.errors.forEach((err) => {
                        showFormToast("error", err.message);
                    });
                }
            }
        }
    };

    const handleRecommend = (
        recommendation: "recommend" | "promising" | "disrecommend"
    ) => {
        const recommendValue = { recommendation_type: recommendation };
        setFormValues((prev) => ({ ...prev, ...recommendValue }));
    };

    const handleChangeForm = (
        propertyTarget: string,
        value: string | number
    ) => {
        const updatedProperty = { [propertyTarget]: value };
        setFormValues((prev) => ({ ...prev, ...updatedProperty }));
    };

    return (
        <>
            <Heading>Submit New Resource</Heading>

            <Stack justifyContent={"center"}>
                <Input
                    onChange={(e) =>
                        handleChangeForm(e.target.formTarget, e.target.value)
                    }
                    formTarget="resource_name"
                    value={formValues.resource_name}
                    placeholder="Resource Name"
                    _placeholder={{ color: placeholderColor }}
                ></Input>
                <Input
                    onChange={(e) =>
                        handleChangeForm(e.target.formTarget, e.target.value)
                    }
                    formTarget="author_name"
                    value={formValues.author_name}
                    placeholder="Author"
                    _placeholder={{ color: placeholderColor }}
                ></Input>

                <InputGroup>
                    <InputLeftAddon textAlign={"center"}>
                        https://{" "}
                    </InputLeftAddon>
                    <Input
                        onChange={(e) =>
                            handleChangeForm(
                                e.target.formTarget,
                                e.target.value
                            )
                        }
                        formTarget="url"
                        value={formValues.url}
                        placeholder="URL"
                        _placeholder={{ color: placeholderColor }}
                    ></Input>
                </InputGroup>
                <Textarea
                    onChange={(e) =>
                        handleChangeForm("description", e.target.value)
                    }
                    value={formValues.description}
                    placeholder="Description"
                    _placeholder={{ color: placeholderColor }}
                ></Textarea>

                <InputGroup>
                    <InputLeftAddon w={"9rem"}> Content Type</InputLeftAddon>
                    <Select
                        onChange={(e) =>
                            handleChangeForm("content_type", e.target.value)
                        }
                        value={formValues.content_type}
                    >
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
                        onChange={(value) =>
                            handleChangeForm("stage", Number(value))
                        }
                        value={formValues.stage}
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
                    colorScheme={"green"}
                    variant={
                        formValues.recommendation_type === "recommend"
                            ? "solid"
                            : "outline"
                    }
                >
                    Recommend
                </Button>

                <Button
                    onClick={() => handleRecommend("promising")}
                    colorScheme={"blue"}
                    variant={
                        formValues.recommendation_type === "promising"
                            ? "solid"
                            : "outline"
                    }
                >
                    Looks Promising
                </Button>

                <Button
                    onClick={() => handleRecommend("disrecommend")}
                    colorScheme={"red"}
                    variant={
                        formValues.recommendation_type === "disrecommend"
                            ? "solid"
                            : "outline"
                    }
                >
                    Don't Recommend
                </Button>

                <Textarea
                    onChange={(e) => handleChangeForm("reason", e.target.value)}
                    value={formValues.reason}
                    placeholder="Reason for (anti)recommendation"
                    _placeholder={{ color: placeholderColor }}
                ></Textarea>
                <Button onClick={handleSubmit}> Submit</Button>
            </Stack>
        </>
    );
};
