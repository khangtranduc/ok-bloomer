<script lang="ts">
    import type { Product } from '$lib/types';
    import Carousel from './carousel.svelte';
    import Star from '../search/star.svelte';
    import Review from './review.svelte';


    export let data;

    let product = data.product as Product;

    let reviews = data.reviews ?? [];
    let splashes = data.splashes ?? [];

    let open = false;
</script>

{#if open}
<dialog open>
    <article>
        <header>
            <a class="close" href={'#'} on:click={() => {open = false}}> </a>
            Write a review!
        </header>
        <form method="POST" action="?/review">
            <input type="hidden" name="thread_id" value={product.product_id}/>
            <textarea id="text" name="text" rows="3" cols="50" placeholder="Type your post here..."/>
            <button type="submit">Post</button>
        </form>
    </article>
</dialog>
{/if}

<main class="container">
    <hgroup>
        <h1>{product.name}</h1>
        <p>Offered by @{product.sname}</p>
        <Star stars={+product.rating.toFixed(2)}/>
    </hgroup>
    <vgroup>
        <Carousel {splashes}/>
        <div>
            <hgroup>
                <h1>Description</h1>
                <p>{product.description}</p>
            </hgroup>
            <div>
                <hgroup>
                    <h1>Price: ${product.price.toFixed(2)}</h1>
                    <p>Stock: {product.stock}</p>
                </hgroup>
                <button>
                    Buy Now!
                    <iconify-icon icon="lucide:shopping-cart"/>
                </button>
            </div>
        </div>
    </vgroup>
    <vflex>
        <hgroup>
            <h2>Reviews</h2>
            <p>{reviews.length} reviews</p>
        </hgroup>
        <button on:click={() => open = true}>
            Write a review!
        </button>
    </vflex>
    <list>
        {#each reviews as review}
            <Review {review}/>
        {/each}
    </list>
</main>

<style lang="scss">
    p {
        margin-bottom: 0;
    }
    list {
        display: flex;
        flex-direction: column;
        gap: .3rem;
    }
    vgroup {
        display: flex;
        justify-content: space-around;
        margin-bottom: 2rem;
    }
    vflex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        > button {
            margin: 0;
            width: fit-content;
        }
    }
    div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>