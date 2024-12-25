import { db } from "$lib/database";
import { fail, redirect } from "@sveltejs/kit";
import type { RowDataPacket } from "mysql2/promise";
import type { Message, User } from "$lib/types";
import type { Actions, Action } from "./$types";

export const prerender = false;

export const load = async ({ cookies, url }) => {
    const uid  = cookies.get('session');
    if (!uid) throw redirect(302, '/login');
    const ruid = url.searchParams.get('ruid');

    const [rows, _] = await db.execute<RowDataPacket[]>(`
        select uid, email, fname, lname, username, utype, text as last
        from user, (
            select t.ruid, text, t.timeStamp from (
                select ruid, max(timeStamp) timeStamp
                from (
                    select distinct ruid, text, timeStamp
                    from message m1
                    where suid = ?
                    union
                    select distinct suid as ruid, text, timeStamp
                    from message m1
                    where ruid = ?
                ) t
                group by ruid
            ) t, message
            where ((t.ruid = message.ruid and message.suid = ?) or (t.ruid = message.suid and message.ruid = ?)) and t.timeStamp = message.timeStamp
        ) t
        where uid = t.ruid
        order by timeStamp desc
    `, [uid, uid, uid, uid]);

    return {
        contacts: <User[]> rows,
        ruid: ruid
    }
}

const selectChat: Action = async ({ request, cookies }) => {
    const data = await request.formData();
    const ruid = data.get('selectChat');
    const session = cookies.get('session');

    if (!ruid) return fail(400, { selection: true });

    const [rows, _] = await db.execute(`
        select * 
        from message
        where (ruid = ? and suid = ?) or (ruid = ? and suid = ?)
        order by timeStamp desc`,
    [session, ruid, ruid, session]);

    return {
        convo: <Message[]> rows,
        ruid
    }
}

const sendMessage: Action = async ({ request, cookies }) => {
    const data = await request.formData();
    const ruid = data.get('ruid');
    const suid = cookies.get('session');
    const message = data.get('message');

    if (!message) return fail(400, { message: true });

    await db.execute(`
        insert into message (suid, ruid, text) values
        (?, ?, ?)
    `, [suid, ruid, message]);

    const [rows, _] = await db.execute(`
        select * 
        from message
        where (ruid = ? and suid = ?) or (ruid = ? and suid = ?)
        order by timeStamp desc`,
    [suid, ruid, ruid, suid]);

    return {
        convo: <Message[]> rows,
        ruid
    }
}

export const actions: Actions = { selectChat, sendMessage };