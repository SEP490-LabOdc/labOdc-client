import SignIn from "@/features/auth/sign-in";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

const searchSchema = z.object({
    redirect: z.string().optional(),
    mode: z.enum(['user', 'company']).optional()
})

export const Route = createFileRoute('/(auth)/sign-in/')({
    component: SignIn,
    validateSearch: searchSchema
})