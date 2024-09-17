"use client"

import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";

import { Button } from "../ui/button";

import { signIn } from "next-auth/react";

export default function AuthSocial({ isLoading, setIsLoading }) {
    const handleClick = async (provider) => {
        signIn(provider);
    }

    return (
        <div className="flex items-center space-x-[10px]">
            <Button 
                variant="outline"
                className="w-full"
                onClick={() => { handleClick("google") }}
                disabled={ isLoading }
            >
                <FcGoogle size={20} />
            </Button>

            <Button 
                variant="outline"
                className="w-full"
                onClick={ () => { handleClick("github") } }
                disabled={ isLoading }
            >
                <IoLogoGithub size={20} />
            </Button>
        </div>
    )
}
