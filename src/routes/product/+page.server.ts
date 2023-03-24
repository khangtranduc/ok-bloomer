import { db } from '$lib/database';
import type { Product, Review } from '$lib/types';
import { redirect, type Action, type Actions } from '@sveltejs/kit';
import type { RowDataPacket } from 'mysql2/promise';

export const prerender = false;

export const load = async ({ url }) => {
    const pid = url.searchParams.get('pid');
    const [product, _] = await db.execute<RowDataPacket[]>('select *, username as sname from product, user where product_id = ? and suid = uid', [pid]);

    if (!product.length) return redirect(302, '/');

    const [reviews, x] = await db.execute<RowDataPacket[]>('select review.*, username from review, user where product_id = ? and buid = uid', [pid]);
    const [rows, y] = await db.execute<RowDataPacket[]>('select concat("/splash/", product_id, "/", sid, ".jpg") as src from splash where product_id = ?', [pid]);

    const splashes: string[] = [];

    for (let i = 0; i < rows.length; i++)
        splashes.push(rows[i].src)

    return {
        product: <Product> product[0],
        reviews: <Review[]> reviews,
        splashes: splashes
    }
}

const review: Action = async () => {

}

export const actions: Actions = { review }