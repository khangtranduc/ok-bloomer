import { db } from "$lib/database"
import type { Blog } from "$lib/types";
import { fail, type Action, type Actions } from "@sveltejs/kit";
import type { RowDataPacket } from "mysql2/promise";
import path from 'path';
import { writeFile } from 'fs/promises';

export const prerender = false;

export let load = async () => {
    const [rows, _] = await db.execute<RowDataPacket[]>('select blog.*, username, concat_ws(" ", fname, lname) name from blog, user where blog.uid = user.uid');

    return {
        blogs: <Blog[]> rows
    }
}

const newBlog: Action = async ({ request, cookies }) => {
    const data = await request.formData();
    const title = data.get('title');
    const thumbnail = data.get('thumbnail');
    const filename = data.get('filename');
    const uid = cookies.get('session');

    const filePath = path.join(
        process.cwd(),
        'static',
        `/blog/image/${filename}`
    )

    if (typeof thumbnail !== 'string') return fail(400, { thumbnail: true })

    await writeFile(filePath, thumbnail, 'base64');

    await db.execute(`
        insert into blog (title, uid, thumbnail) values
        (?, ?, ?)
    `, [title, uid, `blog/image/${filename}`]);
}

export const actions: Actions = { newBlog }