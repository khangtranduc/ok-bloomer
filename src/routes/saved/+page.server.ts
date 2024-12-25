import { db } from '$lib/database';
import type { Product } from '$lib/types';
import type { RowDataPacket } from 'mysql2/promise';
import type { Action, Actions } from '@sveltejs/kit';

export const prerender = false;

export const load = async ({ cookies }) => {
    const uid = cookies.get('session');

    const [rows, _] = await db.execute<RowDataPacket[]>(`
        select product.product_id product_id, suid, username sname, name, thumbnail, price, rating, stock, category, description
        from product, save, user
        where buid = ? and product.product_id = save.product_id and user.uid = product.suid`, [uid]);
    
    return {
        products: <Product[]> rows
    }
}

const remove: Action = async ({ request, cookies }) => {
    const data = await request.formData();
    const product_id = data.get('product_id');
    const buid = cookies.get('session');

    await db.execute(`
        delete from save
        where buid = ? and product_id = ?
    `, [buid, product_id]);
}

export const actions: Actions = { remove }