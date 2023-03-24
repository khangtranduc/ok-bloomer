<script lang="ts">
    import { goto } from '$app/navigation';
    import Star from './star.svelte';
    import { products, query } from '$lib/stores';

    export let form;

    if (form?.products) $products = form.products;
    if (form?.query) $query = form.query;

    let fallback = '/thumbs/dogtail.png';
</script>

<main class="container-fluid">
    <h1>Our Products</h1>
    <catalog class="flex">
        {#each $products as product}
        <article on:click={() => goto(`/product/?pid=${product.product_id}`)} on:keydown>
            <img alt="" src={product.thumbnail} {...{onerror: `this.onerror=null;this.src='${fallback}'`}}/>
            <h4>{product.name}</h4>
            <vgroup>
                <div>
                    <Star stars={+product.rating.toFixed(2)}/>
                    <mark>{product.category}</mark>
                </div>
                <div>
                    Stocks: {product.stock}
                    <h5 class="gradient">${product.price.toFixed(2)}</h5>
                </div>
            </vgroup>
        </article>
        {/each}
    </catalog>
</main>

<style lang="scss">
    .flex {
        display: flex;
        width: 100vw;
        flex-flow: row wrap;
        justify-content: start;
        gap: .3rem;
        row-gap: .8rem;
        
        @include media(md) {
            align-items: center;
        }
    }
    .gradient {
        @include gradient()
    }
    h4 {
        width: 100%;
        text-align: center;
        margin-bottom: .3rem;
    }
    h5 {
        margin-bottom: 0;
        text-align: end;
    }
    vgroup {
        width: 100%;
        display: flex;
        margin-bottom: .5rem;
        justify-content: space-between;
        padding-right: .5rem;
        padding-left: .5rem;
    }
    article {
        background-color: $card-bg;
        margin: 0;
        width: calc(100vw/6 - .6rem);
        padding: 0;
        transition: .3s;
        
        @include media(lg) {
            width: calc(100vw/3 - .8rem);
        }

        @include media(md) {
            width: 92vw;
        }
        
        &:hover {
            transform: scale(1.1);
            transition: .3s;
            margin-right: .8rem;
            margin-left: .8rem;
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2)
        }
    }
    img {
        width:100%;
        height: 20vh;
        object-fit: cover;
        border-radius: 5px 5px 0 0;
    }
</style>