<script lang="ts">
    import Thread from "./thread.svelte";
    export let data;
    let threads = data.threads;
    let labels = data.labels;
    let open = false;
    let selectLabels: string[] = [];
    let searchQuery: string = "";
    $: re = new RegExp(".*" + searchQuery + ".*", "g");
</script>

{#if open}
<dialog open>
    <article>
        <header>
            <a class="close" href={'#'} on:click={() => {open = false; selectLabels = []}}> </a>
            Open a New Thread!
        </header>
        <chipset>
            {#each selectLabels as label}
                <span>{label}</span>
            {/each}
        </chipset>
        <form method="POST" action="?/popopen">
            <input type="hidden" name="labels" value={JSON.stringify(selectLabels)}/>
            <label for="label">Fruit</label>
            <select id="label" required>
                <option value="" selected>Select label some labels</option>
                {#each labels as label}
                    <option on:click={() => {if (!selectLabels.includes(label.label)) selectLabels = [...selectLabels, label.label]}}>{label.label}</option>
                {/each}
            </select>
            <label>
                Title
                <input id='title' name='title' placeholder="Thread title here..."/>
            </label>
            <label>
                Original Post
                <textarea id="text" name="text" rows="3" cols="50" placeholder="Type your post here..."/>
            </label>
            <button type="submit">Create</button>
        </form>
    </article>
</dialog>
{/if}

<main class="container">
    <vgroup>
        <h1>Threads</h1>
        <form>
            <input bind:value={searchQuery} type="search" placeholder="Search Threads..."/>
        </form>
    </vgroup>
    <hr>
    {#each threads as thread}
        {#if thread.title.match(re)}
        <Thread thread_id = {thread.thread_id}
                title = {thread.title} 
                timeStamp = {thread.timeStamp} 
                resolved = {thread.resolved}
                labels = {thread.labels}/>
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
    vgroup {
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: .3rem;
        padding: 0;
        h1 {
            margin: 0;
        }
        form {
            margin: 0;
            input {
                margin: 0;
                height: 2.2rem;
            }
        }
    }
    chipset {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: .3rem;
        > span {
            width: fit-content;
            border-radius: 5px;
            padding: .1rem;
            background-color: $star-col;
        }
    }
</style>