"use client"

import { useState, useEffect } from "react";
import { RegisterSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import sendOtp from "@/actions/sendOtp";
import register from "@/actions/register";

export default function RegisterForm({ open, onOpenChange }) {
    const [isCooldown, setIsCooldown] = useState(false);
    const [cooldownTime, setCooldownTime] = useState(0);
    
    const [isSendEmail, setIsSendEmail] = useState(false);

    // useEffect handle cooldown button
    useEffect(() => {
        let timer;

        if (isCooldown) {
            timer = setInterval(() => {
                setCooldownTime((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setIsCooldown(false);
                        return 0;
                    }

                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isCooldown]);

    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            otp: "",
            name: "",
            password: "",
        }
    });

    const { errors } = form.formState;

    const handleClickSendOTP = async () => {
        setIsCooldown(true);
        setCooldownTime(5);

        setIsSendEmail(true);

        const result = await sendOtp(form.watch("email"));    
        if (result.success) toast.success(result.message);
        else toast.error(result.message);

        setIsSendEmail(false);
    }

    const onSubmit = async (values) => {
        const result = await register(values);

        if (result.success) {
            toast.success(result.message);
            onOpenChange(false);
            form.reset();
        }
        else toast.error(result.message);
    }

    return (
        <Dialog
            open={ open }
            onOpenChange={ () => { 
                onOpenChange();
                form.reset();
            } }
        >
            <DialogContent>
                <DialogHeader 
                    className="flex flex-col justify-center items-center w-full border-b-[1px] border-slate-300 pb-[20px] text-xl"
                >
                    <DialogTitle className="text-2xl mb-[5px]">Register Airbnb</DialogTitle>
                    <DialogDescription>Welcome to Airbnb!</DialogDescription>
                </DialogHeader>

                <Form { ...form }>
                    <form
                        onSubmit={ form.handleSubmit(onSubmit) }
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <FormField
                                name="name"
                                control={ form.control }
                                render={ ({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                { ...field }
                                                type="text"
                                                placeholder="Phi Duc"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                ) }
                            />

                            <FormField
                                name="email"
                                control={ form.control }
                                render={ ({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        
                                        <div
                                            className="flex items-center space-x-[10px]"
                                        >
                                            <FormControl className="w-[70%]">
                                                <Input
                                                    { ...field }
                                                    type="email"
                                                    placeholder="example@gmail.com"
                                                    className="w-full"
                                                    disabled={ isSendEmail }
                                                />
                                            </FormControl>

                                            <Button
                                                type="button"
                                                className="bg-rootColor hover:bg-hoverRootColor w-[30%]"
                                                onClick={ handleClickSendOTP }
                                                disabled={ isCooldown || !form.watch("email") || errors.email || isSendEmail }
                                            >
                                                {
                                                    isCooldown ? `Wait ${ cooldownTime }` : "Send OTP"
                                                }
                                            </Button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                ) }
                            />

                            <FormField
                                name="password"
                                control={ form.control }
                                render={ ({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                { ...field }
                                                type="password"
                                                placeholder="******"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                ) }
                            />

                            <FormField
                                name="otp"
                                control={ form.control }
                                render={ ({ field }) => (
                                    <FormItem>
                                        <FormLabel>OTP</FormLabel>
                                        <FormControl>
                                            <InputOTP
                                                maxLength={ 6 }
                                                { ...field }
                                            >
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={ 0 } />
                                                    <InputOTPSlot index={ 1 } />
                                                    <InputOTPSlot index={ 2 } />
                                                </InputOTPGroup>

                                                <InputOTPSeparator />

                                                <InputOTPGroup>
                                                    <InputOTPSlot index={ 3 } />
                                                    <InputOTPSlot index={ 4 } />
                                                    <InputOTPSlot index={ 5 } />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                ) }
                            />
                        </div>

                        <Button
                            type="submit"
                            className="bg-rootColor hover:bg-hoverRootColor w-full"
                        >
                            Register
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}