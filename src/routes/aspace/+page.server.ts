import { db } from "$lib/database";
import type { RowDataPacket } from "mysql2/promise";
import type { Discount, User } from '$lib/types';
import type { Action, Actions } from "@sveltejs/kit";

export const prerender = false;

export const load = async () => {
    const [rows, _] = await db.execute<RowDataPacket[]>(`
        select t.*, credit
        from (select user.*, verified, balance from user
        left join seller on suid = uid) t
        left join buyer on buid = uid
    `);

    const [diss, x] = await db.execute<RowDataPacket[]>(`
            select * from discount
    `);

    return {
        users: <User[]> rows,
        discounts: <Discount[]> diss
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

const addDiscount: Action = async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name');
    const code = data.get('code');
    const amount = data.get('amount');

    await db.execute(`
        insert into discount values
        (?, ?, ?)
    `, [name, code, amount])
}

export const actions: Actions = { flip, addDiscount }