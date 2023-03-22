import { db } from "$lib/database";
import type { Handle } from "@sveltejs/kit";
import type { RowDataPacket } from 'mysql2/promise';
import type { User } from "$lib/types";

export const handle: Handle = async ({event, resolve}) => {
    //USER AUTHENTICATION
    const session = event.cookies.get('session');
    if (!session)
        return await resolve(event);
    
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

    return await resolve(event);
}