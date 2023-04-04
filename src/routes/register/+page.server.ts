import { db } from "$lib/database";
import { fail, redirect } from "@sveltejs/kit";
import type { Action, Actions } from "./$types";
import type { OkPacket, RowDataPacket } from "mysql2/promise";
import bcrypt from 'bcrypt';

export const prerender = false;

export const load = async ({ locals }) => {
    if (locals.user) throw redirect(302, '/');
}

const register: Action = async ({ cookies, request }) => {
    const data = await request.formData();
    const fname = data.get('fname');
    const lname = data.get('lname');
    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');
    const cpassword = data.get('cpassword');
    const type = data.get('utype');

    if (password != cpassword){
        return fail(400, { fname, lname, username, email, mismatch: true });
    }

    //Check for formality - technically ensured through front-end
    if (typeof password !== 'string' || !password){
        return fail(400, { fname, lname, username, email, invalid: true });
    }

    if (password.length < 6){
        return fail(400, { fname, lname, username, email, short: true});
    }

    const [rows, _] = await db.execute<RowDataPacket[]>("select * from user where email = ?", [email]);

    //Email already exists
    if (rows.length)
        return fail(400, { fname, lname, username, email, credentials: true });

    const passwordHash = await bcrypt.hash(password, 10);

    await db.execute<OkPacket>(`
        insert into user (email, fname, lname, username, password, utype) values
        (?, ?, ?, ?, ?, ?)
    `, [email, fname, lname, username, passwordHash, type]);

    throw redirect(302, '/login');
}  

export const actions: Actions = { register }