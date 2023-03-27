<script lang="ts">
    import { goto } from '$app/navigation';
    import type { Blog } from '$lib/types';

    export let blog: Blog;
    let fallback = '/splashes/weed-1.jpg';
    $: date = new Date(blog.timeStamp);
</script>

<article on:click={() => goto(`/blogpost?bid=${blog.bid}`)} on:keydown>
    <vgroup>
        <img alt="" src={blog.thumbnail} {...{onerror:`this.onerror=null;this.src='${fallback}'`}}/>
        <hgroup>
            <h3>{blog.title}</h3>
            <h4>by {blog.name} <br> {date.toDateString()}</h4>
        </hgroup>
    </vgroup>
</article>

<style lang="scss">
    vgroup {
        display: flex;
        gap: 1rem;
    }
    hgroup {
        margin-bottom: .3rem;
    }
    article {
        margin-top: .3rem;
        margin-bottom: .3rem;
        padding: 0;
        transition: .3s;
        width: 100%;

        &:hover {
            transform: scale(1.01);
            transition: .3s;
        }
    }
    img {
        width: 6rem;
        object-fit: cover;
        border-radius: 5px 0 0 5px;
    }
</style>