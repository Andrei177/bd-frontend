import { z } from "zod";

export const AuthFormSchema = z.object({
    snils: z.string().regex(/^\d{11}$/, "СНИЛС должен состоят из 11 цифр"),
    password: z.string().min(6, "Минимум 6 символов")
})
export type AuthFormSchemaType = z.infer<typeof AuthFormSchema>;