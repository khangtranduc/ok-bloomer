<script lang="ts">
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';
    import Star from './star.svelte';
  
    export let data: PageData;

    let items = [
        {name: "Cat Tail", src: "/seeds/cattail.png", price: 225, ratings: 4.3},
        {name: "Dog Tail", src: "/seeds/dogtail.png", price: 250, ratings: 4.9},
        {name: "Cat Tail", src: "/seeds/cattail.png", price: 225, ratings: 4.3},
        {name: "Dog Tail", src: "/seeds/dogtail.png", price: 250, ratings: 4.9},
        {name: "Cat Tail", src: "/seeds/cattail.png", price: 225, ratings: 4.3},
        {name: "Dog Tail", src: "/seeds/dogtail.png", price: 250, ratings: 4.9},
        {name: "Cat Tail", src: "/seeds/cattail.png", price: 225, ratings: 4.3},
        {name: "Dog Tail", src: "/seeds/dogtail.png", price: 250, ratings: 4.9},
        {name: "Cat Tail", src: "/seeds/cattail.png", price: 225, ratings: 4.3},
        {name: "Dog Tail", src: "/seeds/dogtail.png", price: 250, ratings: 4.9},
        {name: "Dog Tail", src: "/seeds/dogtail.png", price: 250, ratings: 4.9},
    ]
</script>
  
<div class="container-fluid">
    {#if data.slug === undefined}
    <h1>Our Products</h1>
    {:else}
    <h1>Search results for {data.slug}</h1>
    {/if}
    <div class="flex">
        {#each items as x}
        <article on:click={() => goto('/product')} on:keydown>
            <img alt="" src={x.src}/>
            <div class="container">
                <h4>{x.name}</h4>
                <Star stars={x.ratings}/>
                <h4 class="gradient">${x.price}</h4>
            </div>
        </article>
        {/each}
    </div>
</div>

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
    .container {
        padding: .5rem;
    }
    .gradient {
        @include gradient()   
    }
    h4 {
        margin-bottom: .3rem;
        &:not(.gradient){
            text-align: center;
        }
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