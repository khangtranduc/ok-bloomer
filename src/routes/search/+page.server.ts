import { db } from '$lib/database';
import { fail, type Action, type Actions } from '@sveltejs/kit';
import type { RowDataPacket } from 'mysql2/promise';
import type { Product } from '$lib/types';

export const prerender = false;

export const load = async () => {
}

const all: Action = async () => {
  const [rows, _] = await db.execute<RowDataPacket[]>('select product.*, username from product, user where suid = uid limit 20');
  return {
    products: <Product[]> rows
  }
}

const search: Action = async ({ request }) => {
  const data = await request.formData();
  const query = data.get('query');

  if (!query) return fail(400, { noQuery: true });

  const [[rows, x], _] = await db.execute<RowDataPacket[]>('call fuzzy_search(?);', [query])

  return {
    products: <Product[]> rows,
    query
  }
}

export const actions: Actions = { search, all }

