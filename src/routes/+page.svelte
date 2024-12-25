<script lang="ts">
    import { page } from '$app/stores';
    import { query, isOpen } from '$lib/stores';
    import { slide, fade } from 'svelte/transition';

    $query = "";

    let user = $page.data.user;
    $: queryString = $query;
    $: utype = user?.utype;

    let curr = 0;
    setInterval(() => curr = (curr + 1) % 6, 3000)
</script>

<img src="splashes/weed-{curr + 1}.jpg" alt=""/> 

<div class="title">
    <h1 class="gradient">OK, Bloomer!</h1>
    {#if utype != 'admin'}
        <p>Your one stop shop for everything <span class="gradient">botany</span></p>
    {:else}
        <p>Welcome admin {`${user.fname} ${user.lname}`}</p>
    {/if}
    {#if utype == 'seller'}
    <form action="/dashboard">
        <button type="submit">
            <span>View your products</span>
            <iconify-icon icon="lucide:arrow-right" width="25"/>
        </button>
    </form>
    {:else if utype != 'admin'}
    <form action="/search?/all" method="POST">
        <button type="submit">
            <span>Explore our catalogs</span>
            <iconify-icon icon="lucide:arrow-right" width="25"/>
        </button>
    </form>
    {/if}
</div>

<!-- {#if $isOpen}
<aside in:slide="{{ duration: 200 }}" out:slide="{{ duration: 200 }}">
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/thread">Thread</a></li>
            <li><a href="/blog">Blog</a></li>
            {#if utype == 'buyer'}
            <li><a href="/saved">Saved</a></li>
            {:else if utype == 'admin'}
            <li><a href="/aspace">Admin Space</a></li>
            {/if}
            <hr>
            <li>
                <form action={`/search?/${!!queryString? 'search' : 'all'}`} method='POST'>
                    <input bind:value={queryString} type="search" id="query" name="query" placeholder="Search">
                </form>
            </li>
        </ul>
    </nav>
</aside>
<gray transition:fade="{{ duration: 200 }}"/>
{/if} -->

<style lang="scss">
    .title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .gradient {
        @include gradient();
        filter: $filter-text;
    }
    
    form {
        padding: 0;
        margin: 0;
        margin-top: .3rem;
        display: flex;
        justify-content: center;
        input {
            margin: 0;
            width: 80%;
        }
    }

    gray {
        position: absolute;
        width: 100%;
        height: 90%;
        top: 10%;
        background-color: gray;
        filter: opacity(.4);
    }

    aside {
        position: absolute;
        top: 8%;
        width: 100%;
        background-color:white;
        padding-top: 1rem;
        padding-bottom: 1rem;
        margin: 0;
        z-index: 1;
        li {
            padding: 0;
            a {
                text-align: center;
            }
        }
    }

    img {
        width: 100%;
        height: 89vh;
        object-fit: cover;
        filter: $filter-img;
        @include media(lg, md) {
            height: 92vh;
        }
    }

    div {
        h1 {
            @include text($size: 5rem, $stroke: 0.1rem, $stroke-color: white);
            margin-bottom: 1%;
            @include media(md){
                font-size: 3rem;
                width: 90vw;
            }
        }

        p {
            @include text($color: white, $size: 1.2rem, $weight: bold, $stroke: 0.03rem, $stroke-color: white);
        }
    } 
    

    button {
        display: flex;
        align-items: center;
        background: linear-gradient(to right, $primary-500, $primary-700);
        justify-content: center;
        gap: 3%;
        border: none;
        transition: .3s;
        &:hover {
            transition: .3s;
            transform: scale(1.1);
            background: linear-gradient(to right, #878787, #6e6e6e);
        }
    }
</style>