import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Email tidak valid"),
    password: z.string().min(3, "Password minimal 3 karakter"),
})

export const registerSchema = z.object({
    username: z.string().min(3, "Username minimal 3 karakter"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(3, "Password minimal 3 karakter"),
})

