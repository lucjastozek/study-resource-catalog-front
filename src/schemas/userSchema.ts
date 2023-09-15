import { z } from "zod";

export const userSchema = z.object({
    user_name: z
        .string()
        .min(1, "username has to be at least 1 character long")
        .max(50, "username has to be maximum 50 characters long"),
    is_faculty: z.boolean(),
});
