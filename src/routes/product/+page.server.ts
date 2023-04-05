import { db } from '$lib/database';
import type { Product, Review } from '$lib/types';
import { fail, redirect, type Action, type Actions } from '@sveltejs/kit';
import type { RowDataPacket } from 'mysql2/promise';
import path from 'path';
import { writeFile, unlink, mkdir } from 'fs/promises';

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

const updateTitle: Action = async ({ request }) => {
    const data = await request.formData();
    const title = data.get('title');
    const pid = data.get('pid');

    if (typeof title !== 'string' || typeof pid !== 'string' || !title || !pid)
        return fail(400, { error: true })

    await db.execute(`
        update product
        set name = ?
        where product_id = ?
    `, [title, pid]);

    throw redirect(302, `/product?pid=${pid}`)
}

const updatePrice: Action = async ({ request }) => {
    const data = await request.formData();
    const price = data.get('price');
    const pid = data.get('pid');

    if (typeof price !== 'string' || typeof pid !== 'string' || !price || !pid)
        return fail(400, { error: true })

    await db.execute(`
        update product
        set price = ?
        where product_id = ?
    `, [price, pid]);

    throw redirect(302, `/product?pid=${pid}`)
}

const updateStock: Action = async ({ request }) => {
    const data = await request.formData();
    const stock = data.get('stock');
    const pid = data.get('pid');

    if (typeof stock !== 'string' || typeof pid !== 'string' || !stock || !pid)
        return fail(400, { error: true })

    await db.execute(`
        update product
        set stock = ?
        where product_id = ?
    `, [stock, pid]);

    throw redirect(302, `/product?pid=${pid}`)
}

const updateDesc: Action = async ({ request }) => {
    const data = await request.formData();
    const desc = data.get('desc');
    const pid = data.get('pid');

    if (typeof desc !== 'string' || typeof pid !== 'string' || !desc || !pid)
        return fail(400, { error: true })

    await db.execute(`
        update product
        set description = ?
        where product_id = ?
    `, [desc, pid]);

    throw redirect(302, `/product?pid=${pid}`)
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

const splashChange: Action = async ({ request }) => {
    const data = await request.formData();
    const filename = data.get('filename');
    const image = data.get('image');
    const product_id = data.get('product_id');
    const ifNew = data.get('ifNew');

    // throw redirect(302, `/product?pid=${product_id}&cock=${image}`);

    if (typeof image !== 'string' || typeof filename !== 'string')
        return fail(400, { notString: true });

    const filePath = path.join(
        process.cwd(),
        'static',
        filename
    );

    await mkdir(filePath.split('\\').slice(0,-1).join('\\'), { recursive: true })

    await writeFile(filePath, image, 'base64');

    if (!!ifNew){
        db.execute(`
            insert into splash (product_id) values
            (?)
        `, [product_id]);
    }

    throw redirect(302, `/product?pid=${product_id}`);
}

const deleteImg: Action = async ({ request }) => {
    const data = await request.formData();
    const sid = data.get('sid');
    const filename = data.get('filename');
    const product_id = data.get('product_id');

    if (typeof sid !== 'string' 
        || typeof filename !== 'string' 
        || typeof product_id !== 'string')
        return fail(400, { error: true });

    const filePath = path.join(
        process.cwd(),
        'static',
        filename
    )

    await unlink(filePath);

    await db.execute(`
        delete from splash
        where product_id = ? and sid = ?
    `, [product_id, sid]);

    throw redirect(302, `/product?pid=${product_id}`);
}

export const actions: Actions = { 
    review, 
    save, 
    updateTitle, 
    updateDesc, 
    updatePrice,
    updateStock,
    splashChange, 
    deleteImg
}