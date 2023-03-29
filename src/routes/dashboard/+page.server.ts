import { fail, redirect } from '@sveltejs/kit';
import type { Action, Actions } from '@sveltejs/kit';
import { db } from '$lib/database';
import type { RowDataPacket } from 'mysql2/promise';
import type { User } from '$lib/types';

export const prerender = false;

export const load = async ({ locals, cookies }) => {
    if (!locals.user) throw redirect(302, "/");
    const uid = cookies.get('session');
    const [rows, _] = await db.execute<RowDataPacket[]>(`
        select *
        from user
        where uid = ?
    `, [uid]);

    if (rows.length){
        locals.user = <User> rows[0];
        if (locals.user.utype == "buyer") {
            const [rows, _] = await db.execute<RowDataPacket[]>('select * from buyer where buid = ?', [uid]);
            if (rows.length) locals.user.credit = rows[0].credit;
        }
        else if (locals.user.utype == "seller"){
            const [rows, _] = await db.execute<RowDataPacket[]>('select * from seller where suid = ?', [uid]);
            if (rows.length) {
                locals.user.balance = rows[0].balance;
                locals.user.verified = rows[0].verified;
            }
        }
    }

    return {
        user: locals.user
    }
}

const updateInfo: Action = async ({ request, cookies }) => {
    const data = await request.formData();
    const field = data.get("field");
    const value = data.get("value");
    const uid = cookies.get('session');

    if (!field || !value) return fail(400, { empty: true })

    await db.execute(`
        update user
        set ${field} = ?
        where uid = ?
    `, [value, uid]);

    return { success: true }
}

export const actions: Actions = { updateInfo }