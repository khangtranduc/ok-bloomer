import { db } from "$lib/database";
import { redirect, type Handle } from "@sveltejs/kit";
import type { RowDataPacket } from 'mysql2/promise';
import type { User } from "$lib/types";

const loggedinProtected = [
    '/login',
    '/register'
]

const sellerProtected = [
    '/search',
    '/cart',
    '/saved'
]

const adminOnly = [
    '/aspace'
]

const loggedoutProtected = [
    '/dashboard'
]

export const handle: Handle = async ({event, resolve}) => {
    //USER AUTHENTICATION
    const session = event.cookies.get('session');
    if (!session) {
        if (loggedoutProtected.includes(event.url.pathname))
            throw redirect(302, '/login')
        return await resolve(event);
    }
    
    if (session && loggedinProtected.includes(event.url.pathname))
        throw redirect(302, '/dashboard');

    const [rows, _] = await db.execute<RowDataPacket[]>('select * from user where uid = ?', [session]);

    //User exists
    if (rows.length){
        event.locals.user = <User> rows[0];
        if (event.locals.user.utype == "buyer") {
            const [rows, _] = await db.execute<RowDataPacket[]>('select * from buyer where buid = ?', [session]);
            if (rows.length) event.locals.user.credit = rows[0].credit;
        }
        else if (event.locals.user.utype == "seller"){
            const [rows, _] = await db.execute<RowDataPacket[]>('select * from seller where suid = ?', [session]);
            if (rows.length) {
                event.locals.user.balance = rows[0].balance;
                event.locals.user.verified = rows[0].verified;
            }
        }
    }

    if (event.locals.user?.utype == 'seller' && sellerProtected.includes(event.url.pathname))
        throw redirect(302, '/')

    if (adminOnly.includes(event.url.pathname) && event.locals.user?.utype != 'admin')
        throw redirect(302, '/')

    return await resolve(event);
}