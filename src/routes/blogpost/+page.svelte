<script lang="ts">
    import { redirect } from '@sveltejs/kit';
    import {  onMount } from 'svelte'
	import Quill from "quill";
	let quill:any = null;

    export let data;

    if (!data.blog) throw redirect(302, '/blog');

    let blog = data.blog;
    let content: string;
    let edit = false;
    let title = blog.title;
    let editor: HTMLDivElement;
    const getContent = async () => {
        content = await fetch(`${blog.text}.html`).then(async (response) => {
            if(response.status == 200){
                return await response.text()
            }
            return "Currently empty..., press edit to start writing!"
        });
    }
    const submitEdit = () => {
        (<HTMLFormElement> document.getElementById('edit'))?.submit();
    }
    $: if (editor && !quill) {
        quill = new Quill(editor, {
            modules: {
                toolbar: [
                    [{ header: 2 }, { header: 3 }, { header: 4 }, "blockquote"],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "ordered" }],
                    ["link", "code-block"]
                ]
            },
            placeholder: "Type something...",
            theme: "snow" // or 'bubble'
        });
        quill.on('text-change', () => {
            content = quill.root.innerHTML.replaceAll("<p><br></p>", "");
        })
        quill.clipboard.dangerouslyPasteHTML(content);
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
            <!-- <textarea bind:value={content} rows=30/> -->
            <div bind:this={editor}/>
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
            h2, h3, h4, p {
                margin-bottom: 0;
            }
        </style>
    `}
</main>

<svelte:head>
	<link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
</svelte:head>

<style lang="scss">
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