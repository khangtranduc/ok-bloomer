import { fail, redirect } from '@sveltejs/kit';
import type { Action, Actions } from '@sveltejs/kit';
import { db } from '$lib/database';
import type { RowDataPacket } from 'mysql2/promise';
import type { Category, Product, User } from '$lib/types';
import path from 'path';
import { writeFile, unlink } from 'fs/promises';

export const prerender = false;

export const load = async ({ locals, cookies }) => {
    const uid = cookies.get('session');
    const [rows, _] = await db.execute<RowDataPacket[]>(`
        select *
        from user
        where uid = ?
    `, [uid]);
    const [categories, x] = await db.execute<RowDataPacket[]>(`select distinct category from product`)
    let products: Product[] = [];

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
            const [prods, x] = await db.execute<RowDataPacket[]>(`
                select product.*, username 
                from product, user 
                where suid = uid and suid = ?
            `, [uid]);
            products = <Product[]> prods;
        }
    }

    return {
        user: locals.user,
        products: products,
        categories: <string[]> categories.map(x => x.category)
    }
}

const addProduct: Action = async ({ request }) => {
    const data = await request.formData();
    const suid = data.get('suid');
    const title = data.get('title');
    const thumbnail = data.get('thumbnail');
    const filename = data.get('filename');
    const category = data.get('category');

    const filePath = path.join(
        process.cwd(),
        'static',
        `/thumbs/${filename}`
    )

    if (typeof thumbnail !== 'string') return fail(400, { thumbnail: true })

    await writeFile(filePath, thumbnail, 'base64');

    await db.execute(`
        insert into product (suid, thumbnail, name, category) values
        (?, ?, ?, ?)
    `, [suid, `/thumbs/${filename}`, title, category]);

    throw redirect(302, '/dashboard');
}

const deleteProduct: Action = async ({ request }) => {
    const data = await request.formData();
    const product_id = data.get('product_id');
    const filename = data.get('filename');

    if (typeof filename !== 'string') return fail(400, { empty: true });

    const filePath = path.join(
        process.cwd(),
        'static',
        filename
    )

    await unlink(filePath);

    await db.execute(`
        delete from product
        where product_id = ?
    `, [product_id])
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

export const actions: Actions = { updateInfo, addProduct, deleteProduct }