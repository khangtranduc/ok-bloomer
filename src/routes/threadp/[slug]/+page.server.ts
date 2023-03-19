import { db } from '$lib/database';
import type { Thread, ThreadPost } from "$lib/types";
import { fail } from '@sveltejs/kit';
import type { RowDataPacket } from 'mysql2/promise';
import type { Actions, Action } from './$types';

export const prerender = false;

export const load = async ({ params }) => {
    const [rows, _] = await db.execute<RowDataPacket[]>("select threadPost.uid, post_id, username, timeStamp, solution, text from threadPost, user where thread_id = ? and threadPost.uid = user.uid", [params.slug]);
    return {
        thread: db.execute<RowDataPacket[]>("select * from thread where thread_id = ?", [params.slug])
            .then(([rows, _]) => {
                return <Thread> rows[0];
            }),
        threadPosts: <ThreadPost[]> rows
    }
}

const post: Action = async ({ request, cookies }) => {
    const session = cookies.get('session');
    if (!session) return fail(400, { notloggedin: true })
    const data = await request.formData();
    const text = data.get('text');
    const thread_id = data.get('thread_id');

    if (typeof text !== 'string' || !text){
        return;
    }

    await db.execute(`
        insert into threadPost (uid, text, thread_id) values
        (?, ?, ?)
    `, [cookies.get('session'), text, thread_id]);
}

const solved: Action = async ({ request }) => {
    const data = await request.formData();
    const post_id = data.get('post_id');
    const solution = data.get('solution')

    if (typeof post_id !== 'string' || post_id == "-1")
        return fail(400, {post_id});

    await db.execute("update threadPost set solution = ? where post_id = ?", [solution, post_id]);
}

export const actions: Actions = { post, solved }