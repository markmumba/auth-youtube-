import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import db from '@/db/index';
import { users } from '@/db/schema';
import { eq } from "drizzle-orm";


export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        const user = await db.select().from(users).where(eq(users.email, email));
        if (!user) {
            return NextResponse.json({ error: "user does not exist" }, { status: 400 })
        }

        const validPassword = await bcryptjs.compare(password, user[0].password)
        if (!validPassword) {
            return NextResponse.json({ error: "password is not correct" }, { status: 400 })
        }


    } catch (error) {

    }
}


