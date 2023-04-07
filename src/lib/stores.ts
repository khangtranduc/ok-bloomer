import { writable, type Writable } from "svelte/store";
import type { CartItem, Discount, Product } from "$lib/types";
import { browser } from '$app/environment'

export const products: Writable<Product[]> = writable(fromLocalStorage('products', []));
toLocalStorage(products, 'products');

export const query: Writable<string> = writable(fromLocalStorage('query', ''));
toLocalStorage(query, 'query');

export const cart: Writable<CartItem[]> = writable(fromLocalStorage('cart', []));
toLocalStorage(cart, 'cart');

export const discounts: Writable<Discount[]> = writable(fromLocalStorage('discounts', []));
toLocalStorage(discounts, 'discounts')


//Courtesy of this insane man: https://franknoirot.co/posts/svelte-kit-stores-localstorage
function fromLocalStorage(storageKey: string, fallbackValue: any) {
	if (browser) {
		const storedValue = window.sessionStorage.getItem(storageKey)
		
		if (storedValue !== 'undefined' && storedValue !== null) {
			return (typeof fallbackValue === 'object') 
				? JSON.parse(storedValue)
				: storedValue
		}
	}
	
	return fallbackValue
}

function toLocalStorage(store: Writable<any>, storageKey: string) {
	if (browser) {
		store.subscribe(value => {
			let storageValue = (typeof value === 'object') 
				? JSON.stringify(value)
				: value
				
			window.sessionStorage.setItem(storageKey, storageValue)
		})
	}
}
