import { db } from "$lib/database";

export async function load(){
    const [rows, _] = await db.execute("select * from user where utype = ?", ['admin']);
    return {
        rows: rows
    }
}