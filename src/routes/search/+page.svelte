<script lang="ts">
    import { goto } from '$app/navigation';
    import Star from './star.svelte';
    import { products, query } from '$lib/stores';
    import Filter from './filter.svelte';
    import type { Product } from '$lib/types';

    export let form;

    if (form?.products) $products = form.products;
    if (form?.query) $query = form.query;

    let fallback = '/thumbs/dogtail.png';

    
    $: categories = $products.map(x => x.category).reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    $: min = $products.length? $products.map(x => x.price).reduce((acc, e) => {return acc < e ? acc : e}) : 0;
    $: max = $products.map(x => x.price).reduce((acc, e) => {return acc > e ? acc : e}, 0);
    
    let selected: Set<string> = new Set();
    let rating: number;
    let stock: boolean;
    let price: number = max;
    let N = 0;

    $: $products.forEach((curr, i, _) => {
        if (i == 0) N = 0;
        if ((selected.size == 0 || selected.has(curr.category)) 
                && curr.price <= Math.round(price)
                && (curr.rating >= rating || rating == 0.5)
                && ((stock && curr.stock > 0) || !stock))
                N += 1
    })
</script>

<main class="container-fluid">
    <h1>Our Products ({N})</h1>
    <vgroup>
        <Filter {categories} {min} {max} bind:selected bind:price bind:rating bind:stock/>
        <catalog>
            {#each $products as product}
            {#if (selected.size == 0 || selected.has(product.category)) 
                && product.price <= Math.round(price)
                && (product.rating >= rating || rating == 0.5)
                && ((stock && product.stock > 0) || !stock)}
            <article on:click={() => goto(`/product/?pid=${product.product_id}`)} on:keydown>
                <img alt="" src={product.thumbnail} {...{onerror: `this.onerror=null;this.src='${fallback}'`}}/>
                <h4>{product.name}</h4>
                <vgroup>
                    <div>
                        <Star stars={+product.rating.toFixed(2)}/>
                        <mark>{product.category}</mark>
                    </div>
                    <div>
                        Stocks:{product.stock > 99 ? ">99" : " " + product.stock}
                        <h5 class="gradient">${product.price.toFixed(2)}</h5>
                    </div>
                </vgroup>
            </article>
            {/if}
            {/each}
        </catalog>
    </vgroup>
</main>

<style lang="scss">
    .gradient {
        @include gradient()
    }
    catalog {
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
    hgroup {
        margin-right: 3rem;
        border: solid;
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
        width: calc(100%/6 - .6rem);
        height: fit-content;
        padding: 0;
        transition: .3s;
        
        @include media(lg) {
            width: calc(100%/3 - .8rem);
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