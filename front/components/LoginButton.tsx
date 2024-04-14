"use client";
import React from "react";
import Button from "@/components/Button";
import {useSession} from "next-auth/react";
import useAuth from '@/hooks/useAuth';

const LoginButton: React.FC = () => {
    const {data: session} = useSession();
    const { handleLogin, handleLogout } = useAuth();

    return (
        <div className="flex gap-4">
            <Button onClick={handleLogin}>로그인</Button>
        </div>
    );
}

export default LoginButton;
