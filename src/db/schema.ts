import { boolean, date, pgTable, serial, varchar } from "drizzle-orm/pg-core";


// This is a simple user schema
export const users = pgTable ('user',{
    id: serial('id').primaryKey(),
    username : varchar('username').unique().notNull(),
    email : varchar('email').unique().notNull(),
    password : varchar('password').notNull(),
    isVerified : boolean('isVerified').notNull().default(false),
    isAdmin : boolean('isAdmin').notNull().default(false),
    forgotPasswordToken : varchar('forgotPasswordToken'),
    forgotPasswordTokenExpiry : date('forgotPasswordTokenExpiry'),
    verifyToken : varchar('verifyToken'),
    verifyTokenExpiry : date('verifyTokenExpiry'),
})