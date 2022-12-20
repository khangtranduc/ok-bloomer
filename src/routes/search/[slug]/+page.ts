import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
 
export const load = (({ params }) => {
  return {slug: params.slug}
}) satisfies PageLoad;