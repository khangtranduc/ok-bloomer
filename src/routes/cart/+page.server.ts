import { db } from '$lib/database';
import { fail, redirect, type Action, type Actions } from '@sveltejs/kit';
import type { RowDataPacket } from 'mysql2/promise';

export const prerender = false;

export const load = async () => {
    const [rows, _] = await db.execute<RowDataPacket[]>('select distinct method from payment where method <> 1');
    return {
        methods: <string[]> rows.map(x => x.method)
    }
}

const order: Action = async ({ request, cookies }) => {
    const data = await request.formData();
    const cart_string = <string> data.get('cart');
    const method = data.get('method');
    const cart = cart_string? JSON.parse(cart_string) : [];
    const uid = cookies.get('session');

    if (!method) return fail(400, { noMethod: true });

    await db.execute('insert into `order` (buid) values (?)', [uid]);

    const [rows, _] = await db.execute<RowDataPacket[]>('select max(order_id) order_id from `order` where buid = ?', [uid])

    if (!rows.length) return fail(400, { error: true });

    const order_id = rows[0].order_id;

    for (let i = 0; i < cart.length; i++){
        await db.execute(`
            insert into contains values
            (?, ?, ?)
        `, [order_id, cart[i].product_id, cart[i].count]);
        await db.execute(`
            insert into payment (order_id, buid, suid, method, amount) values
            (?, ?, ?, ?, ?)
        `, [order_id, uid, cart[i].suid, method, cart[i].price * cart[i].count]);
    }

    return { success: true };
}

export const actions: Actions = { order }