<script lang="ts">
    import { redirect } from '@sveltejs/kit';

    export let data;

    if (!data.blog) throw redirect(302, '/blog');

    let blog = data.blog;
    let content: string;
    let edit = false;
    let title = blog.title;
    const getContent = async () => {
        content = await (await fetch(`${blog.text}.html`)).text();
    }
    const submitEdit = () => {
        (<HTMLFormElement> document.getElementById('edit'))?.submit();
    }
</script>

<form action="?/edit" method="POST" id="edit">
    <input type="hidden" name="filename" value={`${blog.text}.html`}/>
    <input type="hidden" name="bid" value={blog.bid}/>
    <input type="hidden" name="content" value={content}/>
</form>

<main class="container">
    <vgroup>
        <hgroup>
            {#if edit}
                <input bind:value={title}/>
            {:else}
                <h1>{blog.title}</h1>
            {/if}
            <h2>by {blog.name} (@{blog.username})</h2>
        </hgroup>
        <button on:click={() => {if (edit) submitEdit(); else edit = true;}}>
            {#if edit}
                <iconify-icon icon="lucide:check-circle-2"/>
                Submit
            {:else}
                <iconify-icon icon="lucide:pencil"/>
                Edit
            {/if}
        </button>
    </vgroup>
    {#if content}
        {#if edit}
            <textarea bind:value={content} rows=30/>
        {:else}
            {@html content}
        {/if}
    {:else}
        {#await getContent()}
            <p>...waiting</p>
        {:then}
            {@html content} 
        {/await}
    {/if}
    {@html `
        <style>
            h4, p {
                margin-bottom: 0;
            }
        </style>
    `}
</main>

<svelte:head>
	<link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
</svelte:head>

<style lang="scss">
    #editor {
        height: 20rem;
    }
    vgroup {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: .5rem;
    }
    textarea{
        resize: vertical;
    }
    hgroup {
        flex: 1;
        > input {
            width: 100%;
        }
    }
    button {
        width: fit-content;
        height: 2rem;
        display: flex;
        gap: .5rem;
        align-items: center;
        justify-content: center;
        iconify-icon {
             margin: 0;
        }
    }
</style>