import { db } from '$lib/database.js';
import type { Product, User } from '$lib/types';
import { fail, redirect, type Actions, type Action } from '@sveltejs/kit';
import type { RowDataPacket } from 'mysql2/promise';

export const prerender = false;

export const load = async ({ url }) => {
    const uid = url.searchParams.get('uid');
    const redir = url.searchParams.get('redirect');

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
        products: products,
        redirect: redir
    }
}

const addChat: Action = async ({ request, cookies }) => {
    const data = await request.formData();
    const ruid = data.get('ruid');
    const suid = cookies.get('session');

    if (typeof ruid !== 'string' || !ruid) return fail(400, { error: true });

    await db.execute(`
        insert into message (suid, ruid, text) values
        (?, ?, "emptyasdadbbusdbasudasbduah")
    `, [suid, ruid]);

    throw redirect(302, `/window?uid=${ruid}&redirect=1`);
}

export const actions: Actions = { addChat }