import { db } from '$lib/database';
import type { Blog } from '$lib/types';
import { fail, redirect } from '@sveltejs/kit';
import type { RowDataPacket } from 'mysql2/promise';
import type { Action, Actions } from '@sveltejs/kit';
import path from 'path';
import { writeFile } from 'fs/promises';

export const prerender = false;

export const load = async ({ url, fetch }) => {
    const bid = url.searchParams.get('bid');

    const [rows, _] = await db.execute<RowDataPacket[]>('select blog.*, username, concat_ws(" ", fname, lname) name from blog, user where bid = ? and blog.uid = user.uid', [bid]);

    if (!rows.length) return fail(404);

    const blog = <Blog> rows[0]

    return {
        blog: blog
    }
}

const edit: Action = async ({ request }) => {
    const data = await request.formData();
    const content = data.get('content');
    const filename = data.get('filename');
    const bid = data.get('bid');

    if (typeof filename !== 'string' || typeof content !== 'string' || !filename || !content) return fail(400, { noContent: true });

    const filePath = path.join(
        process.cwd(),
        'static',
        filename
    )

    await writeFile(filePath, content);

    throw redirect(302, `/blogpost?bid=${bid}`)
}

export const actions: Actions = { edit }