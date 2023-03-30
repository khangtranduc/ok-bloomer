<script lang="ts">
    import { redirect } from '@sveltejs/kit';
	import Quill from "quill";
	let quill:any = null;
    let image: string;

    export let data;

    if (!data.blog) throw redirect(302, '/blog');

    let fallback = '/splashes/weed-1.jpg';
    let blog = data.blog;
    let files: FileList;
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
            theme: "snow"
        });
        quill.on('text-change', () => {
            content = quill.root.innerHTML.replaceAll("<p><br></p>", "");
        })
        quill.clipboard.dangerouslyPasteHTML(content);
    }
    $: if (files) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = e => {
            image = (<string> e.target?.result).split(',')[1];
        };
    }
</script>

<form action="?/edit" method="POST" id="edit">
    <input type="hidden" name="filename" value={`${blog.text}.html`}/>
    <input type="hidden" name="image" value={image}/>
    <input type="hidden" name="imagePath" value={blog.thumbnail}/>
    <input type="hidden" name="bid" value={blog.bid}/>
    <input type="hidden" name="title" value={title}/>
    <input type="hidden" name="content" value={content}/>
</form>

<main class="container">
    <vgroup>
        <hgroup>
            <h1>
                {#if edit}
                    <input bind:value={title}/>
                {:else}
                    {blog.title}
                {/if}
            </h1>
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
    <zgroup class:edit>
        <img src={blog.thumbnail} alt="" {...{onerror: `this.onerror=null;this.src='${fallback}'`}}/>
        <input accept="image/png, image/jpeg" type="file" bind:files/>
    </zgroup>
    {#if content}
        {#if edit}
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
    .edit {
        &:hover {
            img {
                transition: .3s;
                opacity: .4;
            }
            input {
                transition: .3s;
                opacity: 1;
            }
        }
    }
    zgroup {
        position: relative;
        > input {
            transition: .3s;
            opacity: 0;
            width: fit-content;
            height: fit-content;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
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
    img {
        transition: .3s;
        width: 100%;
        max-height: 20rem;
        object-fit: cover;
        margin-bottom: 1rem;
    }
    main {
        padding-bottom: 1rem;
    }
</style>