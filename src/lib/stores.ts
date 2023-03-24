import { writable, type Writable } from "svelte/store";
import type { Product } from "$lib/types";
import { browser } from '$app/environment'

export const products = writable(fromLocalStorage('products', []));
toLocalStorage(products, 'products');

export const query = writable(fromLocalStorage('query', ''));
toLocalStorage(query, 'query')


//Courtesy of this insane man: https://franknoirot.co/posts/svelte-kit-stores-localstorage
function fromLocalStorage(storageKey: string, fallbackValue: any) {
	if (browser) {
		const storedValue = window.localStorage.getItem(storageKey)
		
		if (storedValue !== 'undefined' && storedValue !== null) {
			return (typeof fallbackValue === 'object') 
				? JSON.parse(storedValue)
				: storedValue
		}
	}
	
	return fallbackValue
}

function toLocalStorage(store: Writable<Product[]>, storageKey: string) {
	if (browser) {
		store.subscribe(value => {
			let storageValue = (typeof value === 'object') 
				? JSON.stringify(value)
				: value
				
			window.localStorage.setItem(storageKey, storageValue)
		})
	}
}
