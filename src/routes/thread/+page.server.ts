import { db } from "$lib/database"
import type { RowDataPacket } from 'mysql2/promise';
import type { Thread } from "$lib/types";
import type { Action, Actions } from './$types';
import { fail, redirect } from "@sveltejs/kit";

export const prerender = false;

export const load = async () => {
    let threads: Thread[] = [];
    const [rows, _] = await db.execute<RowDataPacket[]>("select * from thread");
    for (let i = 0; i < rows.length; i++){
        const [temp, _] = await db.execute<RowDataPacket[]>("select label from threadLabel where thread_id = ?", [rows[i].thread_id]);
        let labels: string[] = [];
        temp.forEach((row) => {
            labels.push(row.label);
        })
        threads.push({
            thread_id: rows[i].thread_id,
            title: rows[i].title,
            timeStamp: rows[i].timeStamp,
            resolved: rows[i].resolved,
            labels: labels
        })
    }
    return {
        labels: db.execute<RowDataPacket[]>("select distinct label from threadLabel")
            .then(([rows, _]) => {
                return rows;
            }),
        threads: threads
    }
}

const popopen: Action = async ({ request, cookies }) => {
    const session = cookies.get('session');
    if (!session) return fail(400, { notloggedin: true })
    const data = await request.formData();
    const title = data.get('title');
    const text = data.get('text');
    let labels = data.get('labels');

    if (!title || !text){
        return fail(400, { empty: true });
    }

    //TODO: Concurrency problem :skull:
    await db.execute("insert into thread (uid, title) values (?, ?);", [session, title])
    const thread_id = await db.execute<RowDataPacket[]>("select max(thread_id) as tid from thread;").then(([rows, _]) => {return rows[0].tid})
    
    await db.execute("insert into threadPost (thread_id, text, uid) values (?, ?, ?)", [thread_id, text, session]);

    if (labels && typeof labels === 'string') {
        for (const label of JSON.parse(labels)){
            await db.execute("insert into threadLabel (thread_id, label) values (?, ?)", [thread_id, label]);
        }
    }
}

export const actions: Actions = { popopen }