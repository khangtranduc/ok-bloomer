import { db } from '$lib/database';
import type { Discount } from '$lib/types';
import { fail, redirect, type Action, type Actions } from '@sveltejs/kit';
import type { RowDataPacket } from 'mysql2/promise';

export const prerender = false;

export const load = async ({ locals, cookies }) => {
    const uid = cookies.get('session');

    const [rows, _] = await db.execute<RowDataPacket[]>('select distinct method from payment where method <> 1');

    const [discounts, x] = await db.execute<RowDataPacket[]>(`
        select discount.* 
        from discount
        where amount <= ? 
            and not exists (
                select *
                from apply
                where apply.code = discount.code and buid = ?
            )
    `, [locals.user.credit * 0.25, uid])

    return {
        methods: <string[]> rows.map(x => x.method),
        discounts: <Discount[]> discounts
    }
}

const order: Action = async ({ request, cookies }) => {
    const data = await request.formData();
    const cart_string = <string> data.get('cart');
    const discounts_string = <string> data.get('discounts');
    const method = data.get('method');
    const cart = cart_string? JSON.parse(cart_string) : [];
    const discounts = discounts_string? JSON.parse(discounts_string) : [];
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
        await db.execute(`
            update product
            set stock = stock - ?
            where product_id = ?
        `, [cart[i].count, cart[i].product_id])
    }

    for (let i = 0; i < discounts.length; i++){
        await db.execute(`
            insert into apply values
            (?, ?)
        `, [uid, discounts[i]]);
    }

    return { success: true };
}

const addDiscount: Action = async ({ request, cookies }) => {
    const data = await request.formData();
    const code = data.get('code');
    const uid = cookies.get('session');

    const [rows, _] = await db.execute<RowDataPacket[]>(`
        select * from discount
        where code = ? and not exists (
            select buid uid
            from apply
            where buid = ? and apply.code = discount.code
        )
    `, [code, uid]);

    if (!rows.length) return fail(400, { noDiscount: true })

    return {
        discount: <Discount> rows[0]
    }
}

export const actions: Actions = { order, addDiscount }