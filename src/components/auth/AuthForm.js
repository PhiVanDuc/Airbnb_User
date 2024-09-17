"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import {    
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import AuthSocial from "./AuthSocial";

import { login } from "@/actions/login";
import set_info_user from "@/actions/ReuseTasks/user/set_info_user";

export default function AuthForm({ open, onOpenChange }) {
    const [isLoading, setIsLoading] = useState(false);
    const [invalid, setInvalid] = useState("");
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(LoginSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = async (values) => {
        const statusLogin = await login({ ...values, provider: "credentials" }, "/auth/login");
        
        if (statusLogin?.success) {
            await set_info_user(statusLogin);

            window.location.href = "/";
        }
        else toast.error(statusLogin?.message);
    }

    return (
        <Dialog 
            open={ open }
            onOpenChange={ () => { 
                onOpenChange();
                form.reset();
                setInvalid("");
            } }
        >
            <DialogContent>
                <DialogHeader 
                    className="flex flex-col justify-center items-center w-full border-b-[1px] border-slate-300 pb-[20px] text-xl"
                >
                    <DialogTitle className="text-2xl mb-[5px]">Sign in Airbnb</DialogTitle>
                    <DialogDescription>Welcome to Airbnb!</DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    <Form { ...form }>
                        <form 
                            onSubmit={ form.handleSubmit(onSubmit) }
                            className="space-y-6"
                        >
                            <div className="space-y-4">
                                <FormField
                                    control={ form.control }
                                    name="email"
                                    render={ ({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        { ...field }
                                                        placeholder="example@gmail.com"
                                                        type="email"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    } }
                                />

                                <FormField
                                    control={ form.control }
                                    name="password"
                                    render={ ({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        { ...field }
                                                        placeholder="******"
                                                        type="password"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    } }
                                />
                            </div>

                            <div className="text-center text-[14px] text-rootColor font-semibold">{ invalid }</div>

                            <Button
                                type="submit"
                                className="w-full bg-rootColor hover:bg-hoverRootColor"
                                disabled={ isLoading }
                            >
                                Sign in
                            </Button>
                        </form>
                    </Form>

                    <div className="space-y-4">
                        <div className="relative text-center">
                            <span className="absolute inline-block w-full border-b-[1px] border-slate-300 left-0 top-[50%] translate-y-[-50%]"></span>
                            <p className="relative inline-block w-fit text-sm text-slate-500 bg-white px-[10px] z-10">Or sign in with</p>
                        </div>

                        <AuthSocial isLoading={ isLoading } setIsLoading={ setIsLoading } />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}