<script>
    import Blog from "./blog.svelte";

    export let data;

    let blogs = data.blogs ?? [];
</script>

<main class="container">
    <hgroup>
        <h1>Blogs</h1>
        <h2>Read what your fellow botanists has to say :)</h2>
    </hgroup>
    {#each blogs as blog}
        <Blog {blog}/>
    {/each}
</main>