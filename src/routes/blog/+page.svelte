<script lang="ts">
    import Blog from "./blog.svelte";
    let files: FileList;
    let image: string;

    export let data;

    let blogs = data.blogs ?? [];
    let searchQuery = "";
    let open = false;
    $: re = new RegExp(".*" + searchQuery + ".*", "i");
    $: if (files) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = e => {
            image = (<string> e.target?.result).split(',')[1];
        };
    }
</script>

{#if open}
<dialog open>
    <article>
        <header>
            <a class="close" href={'#'} on:click={() => open = false}> </a>
            Open a New Thread!
        </header>
        <form method="POST" action="?/newBlog">
            <label>
                Title
                <input id='title' name='title' placeholder="Blog title here..."/>
            </label>
            <input type="hidden" name="thumbnail" value={image}/>
            <input
                accept="image/png, image/jpeg"
                name="filename"
                bind:files
                type="file"
            />
            <button type="submit">Create</button>
        </form>
    </article>
</dialog>
{/if}

<main class="container">
    <vgroup>
        <hgroup>
            <h1>Blogs</h1>
            <h2>Read what your fellow botanists has to say :)</h2>
        </hgroup>
        <form>
            <input bind:value={searchQuery} type="search" placeholder="Search Threads..."/>
        </form>
    </vgroup>
    {#each blogs as blog}
        {#if blog.title.match(re)}
            <Blog {blog}/>
        {/if}
    {/each}
</main>

<button class="fab" on:click={() => open = true}>
    <iconify-icon icon="lucide:plus"/>
</button>

<style lang="scss">
    .fab {
        width: 3rem;
        height: 3rem;
        border-radius: 100%;
        position: fixed;
        z-index: 1;
        inset-block: auto 2.5vmin;
        inset-inline: auto 30vmin;
        @include media(lg, md) {
            inset-inline: auto 2.5vmin;
        }
    }
    header {
        margin-bottom: 1rem;
    }
    article {
        padding-bottom: 0;
    }
    vgroup {
        display: flex;
        justify-content: space-between;
        align-items: center;
        form {
            margin: 0;
            input {
                margin: 0;
                height: 2.2rem;
            }
        }
    }
</style>