import { db } from '$lib/database.js';
import type { Product, User } from '$lib/types';
import { fail, redirect, type Actions, type Action } from '@sveltejs/kit';
import type { RowDataPacket } from 'mysql2/promise';

export const prerender = false;

export const load = async ({ url, cookies }) => {
    const uid = url.searchParams.get('uid');
    const uuid = cookies.get('session');

    if (uid == uuid) throw redirect(302, '/dashboard');

    const [rows, _] = await db.execute<RowDataPacket[]>(`
        select *,
        case
            when utype = 'seller' then (select verified from seller where suid = uid)
        end as verified
        from user
        where uid = ?
    `, [uid])

    if (rows.length < 1) throw redirect(302, '/');

    const user = <User> rows[0];
    let products: Product[] = [];

    if (user.utype == 'seller'){
        const [prods, x] = await db.execute<RowDataPacket[]>(`
            select product.*, username 
            from product, user 
            where suid = uid and suid = ?
        `, [uid]);
        products = <Product[]> prods;
    }

    return {
        user: user,
        products: products
    }
}

const addChat: Action = async ({ request, cookies, fetch }) => {
    const data = await request.formData();
    const ruid = data.get('ruid');
    const suid = cookies.get('session');

    if (typeof ruid !== 'string' || !ruid) return fail(400, { error: true });

    const [rows, _] = await db.execute<RowDataPacket[]>(`
        select *
        from message
        where (suid = ? and ruid = ?) or (suid = ? and ruid = ?)
        limit 1
    `, [suid, ruid, ruid, suid]);

    if (!rows.length) {
        await db.execute(`
            insert into message (suid, ruid, text) values
            (?, ?, "emptyasdadbbusdbasudasbduah")
        `, [suid, ruid]);
    }

    throw redirect(302, `/chat?ruid=${ruid}`)
}

export const actions: Actions = { addChat }