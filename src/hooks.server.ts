import { db } from "$lib/database";
import type { Handle } from "@sveltejs/kit";
import type { RowDataPacket } from 'mysql2/promise';

function redirect(location: string, body?: string) {
    return new Response(body, {
        status: 303,
        headers: { location }
    });
}

const unProtectedRoutes: string[] = [
    '/',
    '/login',
    '/register',
    '/about',
    '/contact',
    '/search'
];

export const handle: Handle = async ({event, resolve}) => {
    const session = event.cookies.get('session');
    if (!session)
        return await resolve(event);
    
    const [rows, _] = await db.execute<RowDataPacket[]>('select * from user where uid = ?', [session]);

    //User exists
    if (rows.length){
        event.locals.user = {
            email: rows[0].email,
            fname: rows[0].fname,
            lname: rows[0].lname,
            username: rows[0].username,
            utype: rows[0].utype
        };
    }

    return await resolve(event);
}