<script lang="ts">
    import type { CartItem, Product } from '$lib/types';
    import Carousel from './carousel.svelte';
    import Star from '../search/star.svelte';
    import Review from './review.svelte';
    import { cart } from '$lib/stores';


    export let data;

    let product = data.product as Product;

    let reviews = data.reviews ?? [];
    let splashes = data.splashes ?? [];
    let isSaved = data.saved ?? false;
    let count = 0;

    let open = false;
    let confirm = false;
    let reviewRating = 0;
    let root = 0;
    let posX = 0;
    const setRoot = (event: MouseEvent) => {
        root = event.clientX;
    }
    const setPos = (event: MouseEvent) => {
        posX = event.clientX;
    }
    const save = () => {
        const form = <HTMLFormElement> document.getElementById('save');
        form?.submit();
    }
    const addToCart = () => {
        if (!count) return;
        $cart = [...$cart, <CartItem> {
            name: product.name,
            count: count,
            product_id: product.product_id,
            suid: product.suid,
            thumbnail: product.thumbnail,
            price: product.price
        }];
        confirm = true;
        count = 0;
    }
    $: relPosX = posX - root;
    $: isHalf = relPosX < 0 ? relPosX + 30 < 15 : relPosX < 15;
    $: rating = reviewRating >= 0 ? reviewRating + (isHalf ? 0.5 : 1) : 0;
</script>

<form style="display:none" id="save" action="?/save" method="POST">
    <input name="exists" value={isSaved}/>
    <input name="product_id" value={product.product_id}/>
</form>

{#if confirm}
<dialog open>
    <article>
        <header>
            <a class="close" href={'#'} on:click={() => {confirm = false}}> </a>
        </header>
        Product added to cart!
    </article>
</dialog>
{/if}

{#if open}
<dialog open>
    <article>
        <header>
            <a class="close" href={'#'} on:click={() => {open = false}}> </a>
            Write a review!
        </header>
        <form id="review" method="POST" action="?/review">
            <input type="hidden" name="product_id" value={product.product_id}/>
            <input type="hidden" name="rating" value={rating}/>
            <label>
                Title
                <input name="title" placeholder="Title here..."/>
            </label>
            <p>Rating</p>
            <stargroup>
                {#each Array(5) as _, i}
                <star>
                    <iconify-icon   on:mouseenter={setRoot}
                                    on:mousemove={setPos} 
                                    on:mouseenter={() => reviewRating = i}
                                    on:keydown
                                    icon={`lucide:${isHalf && i == reviewRating ? "star-half" : "star"}`}
                                    width=30 
                                    mode="mask"
                                    class:selected={i <= reviewRating}/>
                    <iconify-icon icon="lucide:star" width=30/>
                </star>
                {/each}
                <mark>{rating.toFixed(1)}</mark>
            </stargroup>
            <label>
                Review Content
                <textarea id="text" name="text" rows="3" cols="50" placeholder="Type your post here..."/>
            </label>
            <button type="submit">Post</button>
        </form>
    </article>
</dialog>
{/if}

<main class="container">
    <hgroup>
        <h1>
            {product.name}
            <iconify-icon   on:click={save}
                            on:keydown
                            icon={`material-symbols:bookmark${isSaved ? "" : "-outline"}-rounded`}/>
        </h1>
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
                    <p>Stock left: {product.stock}</p>
                    <spinner>
                        <span>Count:</span>
                        <iconify-icon 
                            icon="lucide:minus" 
                            on:keydown 
                            on:click={() => count = ((count - 1) % product.stock + product.stock) % product.stock}/>
                            <input bind:value={count} on:change={() => count = count % product.stock}/>
                        <iconify-icon icon="lucide:plus" on:keydown on:click={() => count = (count + 1) % product.stock}/>
                    </spinner>
                </hgroup>
                <button on:click={addToCart}>
                    Add to Cart
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
            Write a review
        </button>
    </vflex>
    <list>
        {#each reviews as review}
            <Review {review}/>
        {/each}
    </list>
</main>

<style lang="scss">
    .selected {
        color: $primary-500;
    }
    spinner {
        display: flex;
        align-items: center;
        span {
            margin-right: .3rem;
        }
        iconify-icon {
            border: solid;
            transition: .3s;
            &:hover {
                transform: scale(1.1);
                transition: .3s;
            }
        }
        input {
            width: 2rem;
            height: fit-content;
            padding: 0;
            text-align: center;
        }
    }
    mark {
        background-color: greenyellow;
        border-radius: 5px;
        margin-right: .3rem;
    }
    input {
        margin-bottom: 0;
    }
    h1 {
        display: flex;
        align-items: center;
        gap: .5rem;
    }
    stargroup {
        display: flex;
        margin-bottom: .5rem;
        align-items: center;
        gap: .3rem;
        star {
            display: flex;
            align-items: center;
            position: relative;
            iconify-icon {
                &:first-child {
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            }
        }
    }
    header {
        margin-bottom: 1rem;
    }
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
        > hgroup {
            margin-bottom: .5rem;
        }
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