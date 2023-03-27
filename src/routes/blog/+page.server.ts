import { db } from "$lib/database"
import type { Blog } from "$lib/types";
import type { RowDataPacket } from "mysql2/promise";

export let load = async () => {
    const [rows, _] = await db.execute<RowDataPacket[]>('select blog.*, username, concat_ws(" ", fname, lname) name from blog, user where blog.uid = user.uid');

    return {
        blogs: <Blog[]> rows
    }
}