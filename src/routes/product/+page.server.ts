import { db } from '$lib/database';
import type { Product, Review } from '$lib/types';
import { fail, redirect, type Action, type Actions } from '@sveltejs/kit';
import type { RowDataPacket } from 'mysql2/promise';

export const prerender = false;

export const load = async ({ url, cookies }) => {
    const pid = url.searchParams.get('pid');
    const uid = cookies.get('session');

    const [product, _] = await db.execute<RowDataPacket[]>('select *, username as sname from product, user where product_id = ? and suid = uid', [pid]);

    if (!product.length) return redirect(302, '/');

    const [reviews, x] = await db.execute<RowDataPacket[]>('select review.*, username from review, user where product_id = ? and buid = uid', [pid]);
    const [rows, y] = await db.execute<RowDataPacket[]>('select concat("/splash/", product_id, "/", sid, ".jpg") as src from splash where product_id = ?', [pid]);
    const [exist, z] = await db.execute<RowDataPacket[]>('select exists(select * from save where buid = ? and product_id = ?) exist', [uid, pid])

    const splashes: string[] = [];

    for (let i = 0; i < rows.length; i++)
        splashes.push(rows[i].src)

    return {
        product: <Product> product[0],
        reviews: <Review[]> reviews,
        splashes: splashes,
        saved: <boolean> exist[0].exist
    }
}

const review: Action = async ({ request, cookies }) => {
    const data = await request.formData();
    const title = data.get('title');
    const text = data.get('text');
    const product_id = data.get('product_id');
    const rating = data.get('rating');
    const uid = cookies.get('session');

    if (!title || !text || !product_id || !rating) return fail(400, { missingFields: true });

    await db.execute(`
        delete from review
        where product_id = ? and buid = ?
    `, [product_id, uid]);

    await db.execute(`
        insert into review (buid, product_id, title, text, rating) values
        (?, ?, ?, ?, ?)
    `, [uid, product_id, title, text, rating]);

    // const [reviews, x] = await db.execute<RowDataPacket[]>('select review.*, username from review, user where product_id = ? and buid = uid', [product_id]);

    throw redirect(302, `/product?pid=${product_id}`)
}

const save: Action = async ({ request, cookies }) => {
    const data = await request.formData();
    const exists = data.get('exists');
    const product_id = data.get('product_id');
    const uid = cookies.get('session');
    
    if (exists && +exists) await db.execute('delete from save where buid = ? and product_id = ?', [uid, product_id]);
    else await db.execute('insert into save values (?, ?)', [uid, product_id]);

    throw redirect(302, `/product?pid=${product_id}`)
}

export const actions: Actions = { review, save }