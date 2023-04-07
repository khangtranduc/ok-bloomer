import { db } from "$lib/database";
import type { RowDataPacket } from "mysql2/promise";
import type { User } from '$lib/types';
import type { Action, Actions } from "@sveltejs/kit";

export const prerender = false;

export const load = async () => {
    const [rows, _] = await db.execute<RowDataPacket[]>(`
        select t.*, credit
        from (select user.*, verified, balance from user
        left join seller on suid = uid) t
        left join buyer on buid = uid
    `)

    return {
        users: <User[]> rows
    }
}

const flip: Action = async ({ request }) => {
    const data = await request.formData();
    const uid = data.get('uid');

    await db.execute(`
        update seller
        set verified = verified XOR 1
        where suid = ?
    `, [uid])
}

export const actions: Actions = { flip }