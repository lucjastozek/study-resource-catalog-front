import { Button, Heading, Stack } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { z } from "zod";
import { baseUrl } from "../baseUrl";
import { Resource } from "../interface/Resource";
import { User } from "../interface/User";
import { SubmitForm } from "../interface/submitForm";
import { formSchema } from "../schemas/formSchema";
import { fetchResources } from "../utils/fetchResources";
import { initialForm } from "../utils/initialForm";
import SubmitResourceForm from "./SubmitResourceForm";
import useCustomToast from "./useCustomToast";

interface SubmitResourceProps {
    activeUser?: User;
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
}

export function SubmitResource({
    activeUser,
    setResources,
}: SubmitResourceProps): JSX.Element {
    const [formValues, setFormValues] = useState<SubmitForm>(initialForm);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const showFormToast = useCustomToast();

    async function handleSubmit() {
        if (activeUser) {
            try {
                const userid = { user_id: activeUser.user_id };
                setFormValues((prev) => ({ ...prev, ...userid }));
                formSchema.parse(formValues);
                const resource = await axios.post(
                    baseUrl + "/resources",
                    formValues
                );

                for (const tag of selectedTags) {
                    await axios.post(baseUrl + "/tags", {
                        resource_id: resource.data[0].resource_id,
                        name: tag,
                    });
                }

                setFormValues(initialForm);
                setSelectedTags([]);
                fetchResources().then((res) => setResources(res));

                showFormToast("success", "Resource added!");
            } catch (error) {
                if (error instanceof z.ZodError) {
                    error.errors.forEach((err) => {
                        showFormToast("error", err.message);
                    });
                } else {
                    if (
                        error instanceof AxiosError &&
                        error.response !== undefined
                    ) {
                        showFormToast("error", error.response.data.error);
                    }
                }
            }
        }
    }

    return (
        <>
            <Heading>Submit New Resource</Heading>

            <Stack
                justifyContent={"center"}
                marginInline={{ base: "1rem", lg: "auto" }}
            >
                <SubmitResourceForm
                    formValues={formValues}
                    selectedTags={selectedTags}
                    setFormValues={setFormValues}
                    setSelectedTags={setSelectedTags}
                />

                <Button onClick={handleSubmit}> Submit</Button>
            </Stack>
        </>
    );
}
