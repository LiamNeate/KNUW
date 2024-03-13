import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";
const {
    users
  } = require('../../../lib/placeholder-data.js');

export async function POST(request: Request){
    try{
        const{email, password} = await request.json();
        // validate here
        console.log({ email, password });

        const hashedPassword = await hash(password, 10);
        const response = await sql`
        INSERT INTO users (fname, sname, email, password, team, boss, admin, pre_name)
        VALUES ('Test1', 'User', ${email}, ${hashedPassword}, ${users[1].team}, ${users[1].boss}, ${users[1].admin}, 'Test2')
        `;

    }catch(e){
        console.log({e});
    }

    return NextResponse.json({ message: 'success' })
}