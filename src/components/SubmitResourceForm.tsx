import {
    Text,
    Input,
    InputGroup,
    InputLeftAddon,
    Textarea,
    Card,
    CardBody,
    Badge,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Button,
    useColorMode,
} from "@chakra-ui/react";
import { SubmitForm } from "../interface/submitForm";
import { colorScheme } from "../utils/colorSchemes";
import { contentTypes } from "../utils/contentTypes";
import { formatContentType } from "../utils/formatContentType";
import { tags } from "../utils/tags";

interface SubmitResourceFormProps {
    formValues: SubmitForm;
    setFormValues: React.Dispatch<React.SetStateAction<SubmitForm>>;
    selectedTags: string[];
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function SubmitResourceForm({
    formValues,
    selectedTags,
    setFormValues,
    setSelectedTags,
}: SubmitResourceFormProps): JSX.Element {
    const { colorMode } = useColorMode();
    const placeholderColor = colorMode === "dark" ? "white" : "black";

    function handleRecommend(
        recommendation: "recommend" | "promising" | "disrecommend"
    ) {
        const recommendValue = { recommendation_type: recommendation };
        setFormValues((prev) => ({ ...prev, ...recommendValue }));
    }

    function handleSelectTags(tag: string) {
        if (selectedTags.includes(tag)) {
            const newTags = selectedTags.filter((t) => t !== tag);
            setSelectedTags(newTags);
        } else {
            setSelectedTags((prev) => [...prev, tag]);
        }
    }

    const handleChangeForm = (
        propertyTarget: string,
        value: string | number
    ) => {
        const updatedProperty = { [propertyTarget]: value };
        setFormValues((prev) => ({ ...prev, ...updatedProperty }));
    };

    return (
        <>
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
                <InputLeftAddon textAlign={"center"}>https:// </InputLeftAddon>
                <Input
                    onChange={(e) =>
                        handleChangeForm(e.target.formTarget, e.target.value)
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
            <Card
                background={"#00000000"}
                border={"1px solid #40444e"}
                width={{ base: "auto", lg: "40vw" }}
                direction={"row"}
                align={"center"}
                textAlign={"center"}
            >
                <CardBody>
                    <Text>Tags</Text>
                    {tags.map((tag, index) => (
                        <Badge
                            colorScheme={
                                colorScheme[tag as keyof typeof colorScheme]
                            }
                            key={index}
                            fontSize={{ base: "xs", lg: "sm" }}
                            size={{ base: "xs", lg: "sm" }}
                            margin={{ base: "0.3rem", lg: "0.5rem" }}
                            variant={
                                selectedTags.includes(tag) ? "solid" : "outline"
                            }
                            onClick={() => handleSelectTags(tag)}
                            borderRadius={"9"}
                            style={{
                                paddingTop: "1vh",
                                paddingBottom: "0.5vh",
                                paddingLeft: "1.5vh",
                                paddingRight: "1.5vh",
                            }}
                        >
                            {tag}
                        </Badge>
                    ))}
                </CardBody>
            </Card>

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
                <InputLeftAddon>Build Week </InputLeftAddon>

                <NumberInput
                    onChange={(value) =>
                        handleChangeForm("stage", Number(value))
                    }
                    value={formValues.stage}
                    defaultValue={1}
                    min={1}
                    max={15}
                    width={"100%"}
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
        </>
    );
}
