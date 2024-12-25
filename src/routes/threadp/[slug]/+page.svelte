<script lang="ts">
    import { goto } from "$app/navigation";
    import { page, updated } from "$app/stores";
    export let data;
    export let form;
    let thread = data.thread;
    let threadPosts = data.threadPosts;
    let open: boolean = false;
    let notloggedin = form?.notloggedin;

    const format = (timeStamp: number) => {
        return new Date(timeStamp).toDateString();
    }

    let isOp = threadPosts[0].uid == $page.data.user?.uid;

    let post_id = -1;
    let solution = 1;
    const setSolution = () => {
        let form = <HTMLFormElement>document.getElementById('solve');
        if (isOp && form) form.submit();
    }
</script>

<form style="display:none" id="solve" action="?/solved" method="POST">
    <input type="hidden" name="post_id" id="post_id" value={post_id}/>
    <input type="hidden" name="solution" id="solution" value={solution}/>
</form>

{#if notloggedin}
<dialog open>
    <article>
        <header>
            <a class="close" href={'#'} on:click={() => {notloggedin = false}}> </a>
            Not signed in!
        </header>
        You must be <a href="/login">signed in</a> to write a new thread post.
    </article>
</dialog>
{/if}

{#if open}
<dialog open>
    <article>
        <header>
            <a class="close" href={'#'} on:click={() => open = false}> </a>
            Write a Thread Post!
        </header>
        <form method="POST" action="?/post">
            <input type="hidden" name="thread_id" value={thread.thread_id}/>
            <textarea id="text" name="text" rows="3" cols="50" placeholder="Type your post here..."/>
            <button type="submit">Post</button>
        </form>
    </article>
</dialog>
{/if}

<main class="container">
    <hgroup>
        <h1>{thread.title}</h1>
        <h2>{format(thread.timeStamp)}</h2>
    </hgroup>
    <hgroup>
        {#each threadPosts as threadPost, i}
        <div class:isOp={isOp && !threadPost.solution} 
             class:isOpSol={isOp && threadPost.solution} 
             class:solution={threadPost.solution} 
             on:mouseenter={() => {
                post_id = threadPost.post_id;
                solution = threadPost.solution ? 0 : 1;
             }}
             on:click={() => {if (i != 0) setSolution()}} 
             on:keydown>
            <p>{threadPost.text}</p>
            <p>
                <span>{format(threadPost.timeStamp)}</span>
                <span><a 
                    href={`/window?uid=${threadPost.uid}`}
                    on:click={() => goto(`/window?uid=${threadPost.uid}`)}
                    on:keydown>@{threadPost.username}</a></span>
            </p>
        </div>
        <hr>
        {/each}
    </hgroup>
</main>

<form action="\thread">
    <button class="exit" type="submit">
        <iconify-icon icon="lucide:arrow-left"/>
    </button>
</form>

<button class="fab" on:click={() => open = true}>
    <iconify-icon icon="lucide:pencil"/>
</button>

<style lang="scss">
    .solution {
        border: solid;
        border-color: $star-col;
    }
    .isOpSol {
        &:hover {
            border-color: orangered;
        }
    }
    .isOp {
        &:not(:first-child) {
                &:hover {
                border: solid;
                border-color: $star-col;
            }
        }
    }
    .exit {
        width: 3rem;
        height: 3rem;
        border-radius: 100%;
        position: fixed;
        z-index: 1;
        inset-block: auto 78vmin;
        inset-inline: auto 165vmin;
    }
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
    textarea {
        resize: vertical;
        max-height: 30rem;
    }
    p {
        padding-right: 1rem;
        display: flex;
        justify-content: space-between;
        &:last-child{
            margin-bottom: .3rem;
        }
    }
    div {
        padding: .5rem; 
        padding-bottom: 0;
        &:first-child {
            border: solid;
        }
        > p {
            &:first-child {
                font-weight: bold;
            }
        }
    }
</style>