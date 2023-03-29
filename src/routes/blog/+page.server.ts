import { db } from "$lib/database"
import type { Blog } from "$lib/types";
import type { Action, Actions } from "@sveltejs/kit";
import type { RowDataPacket } from "mysql2/promise";

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
    const uid = cookies.get('session');

    await db.execute(`
        insert into blog (title, uid, thumbnail)
        select ? title, ? uid, concat('/blog/image/', max(bid) + 1)
        from blog
    `, [title, uid]);
}

export const actions: Actions = { newBlog }