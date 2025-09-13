import { ROUTES } from "@/constants";
import SignIn from "@/features/auth/sign-in";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

const searchSchema = z.object({
    redirect: z.string().optional()
})

export const Route = createFileRoute(ROUTES.auth.sign_in)({
    component: SignIn,
    validateSearch: searchSchema
})