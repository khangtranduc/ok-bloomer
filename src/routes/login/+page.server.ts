import { db } from "$lib/database";
import { fail, redirect } from "@sveltejs/kit";
import type { Action, Actions } from "./$types";
import type { RowDataPacket } from "mysql2/promise";
import bcrypt from 'bcrypt';

export const prerender = false;

const login: Action = async ({ cookies, request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    if (typeof email !== 'string' || !email?.match(/.+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+/g)){
      return fail(400, { mail_re: true })
    }

    if (typeof password !== 'string' || !password) {
      return fail(400, { email, incorrect: true });
    }

    const [rows, _] = await db.execute<RowDataPacket[]>("select * from user where email = ? limit 1", [email]);

    //No users
    if (!rows.length)
      return fail(400, { email, credentials: true });
    
    const user = rows[0];

    const userPassword = await bcrypt.compare(password, user.password);

    if (!userPassword)
      return fail(400, { email, password: true })

    cookies.set('session', user.uid, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30,
    });

    throw redirect(302, '/dashboard');
}  

export const actions: Actions = { login }