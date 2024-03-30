'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";


export default function LoginPage() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target
        setUser(prevState => ({
            ...prevState,
            [id]: value
        }))

    }

    async function onLoginUp() {

    }
    
    return (
        <>
            <div className="flex items-stretch w-full  py-72 ">
                <div className="w-full ">
                    <h1 className="font-bold text-6xl p-20">Welcome to the Login page  </h1>
                </div>
                <div className=" w-full p-20">
                    <form onSubmit={onLoginUp}>
                        <div className="grid w-full max-w-xl items-center  gap-2">
                            <Label htmlFor="email" className="text-lg">Email</Label>
                            <Input type="email" id="email" placeholder="Email"
                                value={user.email}
                                onChange={handleChange} />
                        </div>
                        <div className="grid w-full max-w-xl items-center  gap-2">
                            <Label htmlFor="password" className="text-lg">Password</Label>
                            <Input type="password" id="password" placeholder="Password"
                                value={user.password}
                                onChange={handleChange} />
                        </div>
                        <Button className="w-1/4 max-w-sm my-6">Login</Button>
                    </form>
                    <Link href="/signup" className="underline text-blue-500">  Visit sign up page </Link>
                </div>
            </div>

        </>
    )
}