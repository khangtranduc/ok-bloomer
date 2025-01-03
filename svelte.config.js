import preprocess from "svelte-preprocess";
import node from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    preprocess({
      scss: {
        prependData: '@use "src/variables.scss" as *;',
      },
    }),
  ],

  kit: {
    adapter: node({ env: { port: process.env.PORT } })
    // adapter: adapter({
    //   pages: "docs",
    //   assets: "docs",
    //   fallback: "200.html"
    // })
  },
};

export default config;
