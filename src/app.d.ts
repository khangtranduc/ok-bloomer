// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
enum UTYPE{
	BUYER = "buyer",
	SELLER = "seller",
	ADMIN = "admin"
}

import type { Thread } from "$lib/types";

declare global{
	declare namespace App {
		// interface Error {}
		interface Locals {
			user: {
				uid: string,
				email: string,
				fname: string,
				lname: string,
				username: string,
				utype: UTYPE,
				credit?: number,
				verified?: boolean,
				balance?: number
			},
			threads: Thread[]
		}
		// interface PageData {}
		// interface Platform {}
	}
}
