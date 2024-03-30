import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import db from '@/db/index';
import { users } from '@/db/schema';
import { eq } from "drizzle-orm";


export async function POST(req: NextRequest) {
    try {

        const reqBody = await req.json();
        const { username, email, password } = reqBody;
        const user = await db.select().from(users).where(eq(users.email, email)).execute();
        if (user) {
            return NextResponse.json({ error: "user already exists" }, { status: 400 })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = await db.insert(users).values({
            username: username,
            email: email,
            password: hashedPassword
        }).returning().execute();
        console.log(newUser)
        return NextResponse.json({
            message: "User Created Succesfully",
            success: true,
            newUser
        })

    } catch (error) {
        return NextResponse.json({ message: "Error creating user" }, { status: 500 })
    }
}

