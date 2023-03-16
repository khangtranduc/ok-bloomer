import { redirect, type Actions } from "@sveltejs/kit";

export const prerender = false;

export const actions: Actions = {
    default: async (event) => {
        event.cookies.delete('session');
        // event.locals.user = null;
        throw redirect(302, '/')
    }
}