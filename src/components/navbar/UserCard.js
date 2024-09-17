"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { TokenContext } from "@/context/TokenProvider";

import { IoMdMenu } from "react-icons/io";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import AuthForm from "../auth/AuthForm";
import RegisterForm from "../auth/RegisterForm";
import ForgotPasswordForm from "../auth/ForgotPasswordForm";
import { toast } from "sonner";

import { create_token } from "@/actions/token";
import { decrypt } from "@/lib/jwt";
import check_info_user from "@/actions/ReuseTasks/user/check_info_user";
import refresh_access_token from "@/actions/ReuseTasks/token/refresh_access_token";
import update_info_user from "@/actions/ReuseTasks/user/update_info_user";
import { useNotificationsContext } from "@/context/NotificationsProvider";
import { cn } from "@/lib/utils";

export default function UserCard() {
    const router = useRouter();
    const [infoUser, setInfoUser] = useState({});
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

    const openSignInDialog = () => setIsSignInOpen(true);
    const openRegisterDialog = () => setIsRegisterOpen(true);
    const openFotgetPasswordDialog = () => setIsForgotPasswordOpen(true);

    const { allTokens, setTokens } = useContext(TokenContext);
    const { notifications } = useNotificationsContext();

    useEffect(() => {
        (async () => {
            if (allTokens?.access_token) {
                await check_info_user({
                    allTokens,
                    setTokens,
                    router,
                    setState: setInfoUser
                })
            }
        })();
    }, []);

    const accessAdminPage = async () => {
        const refresh = await refresh_access_token(true);
        if (refresh === 401) {
            router.replace("/sign-out");
            return;
        }

        if (refresh?.exp) await update_info_user(infoUser?.id, refresh?.accessToken, router);

        const decode = await decrypt(localStorage.getItem("info_user"));
        const createStatus = await create_token(
            {
                user_id: decode?.payload?.id,
                image: decode?.payload?.image,
                fullname: decode?.payload?.fullname,
                email: decode?.payload?.email,
                roles: decode?.payload?.roles
            },
            "3m"
        );
        if (!createStatus?.success) toast.error("Create url failed!");
        else {
            localStorage.removeItem("info_user");
            window.location.href = `${process.env.NEXT_PUBLIC_AIRBNB_ADMIN}/sign-in?url_token=${createStatus?.token}`;
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div 
                        className={cn(
                            "flex relative items-center p-[5px] rounded-full  border-[1px]",
                            notifications?.messages > 0 ? "border-red-300" : "border-slate-300"
                        )}
                    >
                        <IoMdMenu
                            size={20}
                            className={cn(
                                "me-[10px] ms-[5px]",
                                notifications?.messages > 0 ? "text-red-400" : ""
                            )}
                        />

                        <div className="w-[30px] h-[30px]">
                            {
                                !allTokens?.access_token ?
                                (
                                    <div 
                                        className="bg-slate-300 w-[30px] h-[30px] rounded-full"
                                    ></div>
                                ) :
                                infoUser?.image ? 
                                (
                                    <Image
                                        alt="Avatar"
                                        width={300}
                                        height={300}
                                        src={infoUser?.image}
                                        className="w-[30px] h-[30px] rounded-full object-cover"
                                        priority={true}
                                    />
                                ) :
                                (
                                    <div 
                                        className="bg-slate-500 w-[30px] h-[30px] rounded-full"
                                    ></div>
                                )
                            }
                        </div>
                        
                    </div>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent className="font-medium left-0 p-[5px]" align="end">
                    {
                        !allTokens?.access_token ?
                        (
                            <>
                            <DropdownMenuItem 
                                onClick={openSignInDialog}
                                className="cursor-pointer px-[20px] py-[10px]"
                            >
                                Sign In
                            </DropdownMenuItem>

                            <DropdownMenuItem 
                                onClick={openRegisterDialog} 
                                className="cursor-pointer px-[20px] py-[10px]"
                            >
                                Register
                            </DropdownMenuItem>

                            <DropdownMenuItem 
                                onClick={openFotgetPasswordDialog} 
                                className="cursor-pointer px-[20px] py-[10px]"
                            >
                                Forgot password
                            </DropdownMenuItem></>
                        ) :
                        (
                            <>
                                {/* {
                                    infoUser?.roles?.length > 0 && (
                                        <DropdownMenuItem 
                                            className="cursor-pointer px-[20px] py-[10px]"
                                            onClick={accessAdminPage}
                                        >
                                            Admin page
                                        </DropdownMenuItem>
                                    )
                                } */}

                                <DropdownMenuItem 
                                    className="cursor-pointer px-[20px] py-[10px]"
                                    onClick={accessAdminPage}
                                >
                                    <p>Admin page</p>
                                </DropdownMenuItem>

                                <DropdownMenuItem 
                                    className="cursor-pointer px-[20px] py-[10px] space-x-[10px]"
                                    onClick={() => { router.push("/messages") }}
                                >
                                    <p>Messages</p>
                                    {
                                        notifications?.messages > 0 &&
                                        <span className="flex items-center justify-center text-[12px] text-white font-semibold w-[25px] h-[25px] rounded-full bg-red-400">{notifications?.messages}</span>
                                    }
                                </DropdownMenuItem>

                                <DropdownMenuItem 
                                    className="cursor-pointer px-[20px] py-[10px]"
                                    onClick={() => { router.push("/sign-out") }}
                                >
                                    <p>Sign out</p>
                                </DropdownMenuItem>
                            </>
                        )
                    }
                </DropdownMenuContent>
            </DropdownMenu>

            <AuthForm open={ isSignInOpen } onOpenChange={ setIsSignInOpen } />
            <RegisterForm open={ isRegisterOpen } onOpenChange={ setIsRegisterOpen } />
            <ForgotPasswordForm open={ isForgotPasswordOpen } onOpenChange={ setIsForgotPasswordOpen } />
        </>
    );
}