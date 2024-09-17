import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required!"
    }),
    password: z.string().min(1, {
        message: "Password is required!"
    }),
});

export const RegisterSchema = z.object({
    email: z.string().min(1, {
        message: "Email is required!"
    }).email({
        message: "Invalid Email!"
    }),
    otp: z.string().min(1, {
        message: "OTP is required!"
    }),
    name: z.string().min(3, {
        message: "Enter at least 3 characters!"
    }),
    password: z.string().min(6, {
        message: "Enter at least 6 characters!"
    }),
});

export const ForgotPasswordSchema = z.object({
    email: z.string().min(1, {
        message: "Email is required!"
    }).email({
        message: "Invalid Email!"
    }),
    otp: z.string().min(1, {
        message: "OTP is required!"
    }),
    password: z.string().min(6, {
        message: "Enter at least 6 characters!"
    }),
});