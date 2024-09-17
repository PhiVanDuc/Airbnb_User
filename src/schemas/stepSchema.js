import * as z from "zod";

export const StructureSchema = z.object({
    structure: z.string().min(1),
});

export const PrivacyTypeSchema = z.object({
    privacy_type: z.string().min(1),
});

export const PaymentSchema = z.object({
    phone_number: z.string()
        .min(1, "Please enter phone number")
        .regex(/^\+?[1-9]\d{1,14}$/, "Please enter the correct phone number format. Exp: +code number")
});