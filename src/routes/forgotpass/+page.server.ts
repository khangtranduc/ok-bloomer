import { db } from "$lib/database";
import type { User } from "$lib/types";
import { type Actions, type Action, fail, redirect } from "@sveltejs/kit";
import bcrypt from 'bcrypt';
import type { RowDataPacket } from "mysql2/promise";

export const prerender = false;

const reset: Action = async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const old = data.get('old');
    const newpass = data.get('new');
    const confirm = data.get('confirm');

    const [rows, _] = await db.execute<RowDataPacket[]>(`
        select *
        from user
        where email = ?
    `, [email])

    if (!rows.length) return fail(400, { email: true });

    const user = <User> rows[0];

    if (typeof old !== 'string'
        || typeof newpass !== 'string'
        || typeof confirm !== 'string'
        || !old
        || !newpass
        || !confirm
    ) return fail(400, { neverHappen: true });

    if (!await bcrypt.compare(old, user.password)) return fail(400, { password: true });

    if (newpass !== confirm) return fail(400, { mismatch: true });

    await db.execute(`
        update user
        set password = ?
        where uid = ?
    `, [await bcrypt.hash(newpass, 10), user.uid]);

    throw redirect(302, '/login');
}

export const actions: Actions = { reset }