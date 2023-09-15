import { z } from "zod";

export const formSchema = z.object({
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
    stage: z
        .number()
        .min(1, "You must input a build week number")
        .max(15, "Your build week number exceeds the maximum week"),
    recommendation_type: z.enum(["recommend", "promising", "disrecommend"]),
    reason: z
        .string()
        .min(1, "You need to input a reason for recommending")
        .max(250, "Your reason exceeds maximum characters of 250"),
    user_id: z.number().min(1),
});
