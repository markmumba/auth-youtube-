'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from 'axios';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function SignUpPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target
        setUser(prevState => ({
            ...prevState,
            [id]: value
        }))

    }

    async function onSignUp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user)
            console.log("sign up succesful", response.data);
            router.push("/login");

        } catch (error: any) {
            console.log("sign up failed ", error.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])



    return (
        <>
            <div className="flex items-stretch w-full  py-72 ">
                <div className="w-full ">
                    <h1 className="font-bold text-6xl p-20">Welcome to the Sign up Page   </h1>
                </div>
                <div className=" w-full">
                    <h3 className="text-2xl p-10"> {loading ? "Processing sign up..." : ""} </h3>
                    <form >
                        <div className="grid w-full max-w-xl items-center  gap-2">
                            <Label htmlFor="email" className="text-lg">Email</Label>
                            <Input type="email" id="email" placeholder="Email"
                                value={user.email}
                                onChange={handleChange} />
                        </div>
                        <div className="grid w-full max-w-xl items-center gap-2">
                            <Label htmlFor="username" className="text-lg">Username</Label>
                            <Input type="username" id="username" placeholder="Username"
                                value={user.username}
                                onChange={handleChange} />

                        </div>
                        <div className="grid w-full max-w-xl items-center  gap-2">
                            <Label htmlFor="password" className="text-lg">Password</Label>
                            <Input type="password" id="password" placeholder="Password"
                                value={user.password}
                                onChange={handleChange} />
                        </div>
                        <Button onClick={onSignUp} variant={`${buttonDisabled ? "outline" : "default"}`} className='max-w-lg w-1/4 my-6' type="submit">Sign Up</Button>
                    </form>
                    <Link href="/login" className="underline text-blue-500">  Visit login page </Link>
                </div>
            </div>
        </>
    )
}
