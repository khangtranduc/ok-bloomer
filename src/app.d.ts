// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
enum UTYPE{
	BUYER = "buyer",
	SELLER = "seller",
	ADMIN = "admin"
}

declare namespace App {

	// interface Error {}
	interface Locals {
		user: {
			email: string,
			fname: string,
			lname: string,
			username: string,
			utype: UTYPE
		}
	}
	// interface PageData {}
	// interface Platform {}
}
